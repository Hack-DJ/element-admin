<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item v-for="item in itemList" :label="item.label" :prop="item.prop" :key="item.prop">
        <template v-if="item.type==='radio'">
          <el-radio v-for="option in item.optionList" v-model="ruleForm[item.prop]" :label="option.value" :key="option.value">{{ option.label }}</el-radio>
        </template>
        <template v-if="item.type==='parent'">
          <el-input :value="ruleForm[item.prop]" :placeholder="item | placeholder" clearable readonly>
            <el-button v-if="item.inputType==='list'" slot="append" icon="el-icon-search" @click="parentShow(item,'list')" />
            <el-button v-else slot="append" icon="el-icon-search" @click="parentShow(item.prop,'menu')" />
          </el-input>
        </template>
        <template v-if="item.type==='icon'">
          <el-input v-model="ruleForm[item.prop]" clearable readonly>
            <svg-icon slot="prepend" :icon-class="ruleForm[item.prop]" />
            <el-button slot="append" icon="el-icon-search" @click="iconDialog=true" />
          </el-input>
        </template>
        <template v-if="item.type==='switch'">
          <el-switch :value="switchShow(ruleForm[item.prop])" @input="switchInput(item.prop,$event)" />
        </template>
        <template v-if="item.type==='input'">
          <el-input v-model="ruleForm[item.prop]" :type="item | inputType" :placeholder="item | placeholder" />
        </template>
        <template v-if="item.type==='select'">
          <el-select v-model="ruleForm[item.prop]" :placeholder="item | placeholder" clearable>
            <el-option
              v-for="option in item.optionList"
              :key="option.value"
              :label="option.label"
              :value="option.value" />
          </el-select>
        </template>
        <template v-if="item.type==='datetime'">
          <el-date-picker
            v-model="ruleForm[item.prop]"
            :placeholder="item | placeholder"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime" />
        </template>
      </el-form-item>
      <slot name="formBtn" />
    </el-form>
    <dialog-icon :show.sync="iconDialog" :icon.sync="ruleForm.icon" />
    <dialog-parent-tree v-if="parentTreeDialog" :tree-list="treeList" :show.sync="parentTreeDialog" @change="parentChange" />
    <dialog-parent-pagination v-if="parentListDialog" :show.sync="parentListDialog" :form-data="parentFormData" @change="parentChange" />
  </div>
</template>

<script>

import { DialogIcon, DialogPermissionTree, DialogParentTree, DialogParentPagination } from '@/components/Dialog'

export default {
  name: 'FormPlan',
  components: {
    DialogIcon,
    DialogParentTree,
    DialogPermissionTree,
    DialogParentPagination
  },
  filters: {
    placeholder(item) {
      let placeholder = item.placeholder
      if (!placeholder) {
        placeholder = item.type === 'select' ? '请选择' : '请输入内容'
      }
      return placeholder
    },
    inputType(item) {
      return item.inputType || 'text'
    }
  },
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    },
    itemList: { type: Array, default: () => [] },
    treeList: {
      type: Array,
      default: () => []
    },
    treeIdKey: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      ruleForm: {},
      // icon弹窗
      iconDialog: false,
      // 菜单父级树弹窗
      parentTreeDialog: false,
      parentListDialog: false,
      // 当前修改参数Item
      parentItem: {}
    }
  },
  computed: {
    parentFormData() {
      const tmp = this._.pick(this.parentItem, ['listUrl', 'parentCloumnsList', 'parentSearchCriteria', 'pageName', 'parentReplace'])
      return tmp
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.ruleForm = this._.cloneDeep(val)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // switch按钮
    switchShow(value) {
      return !!parseInt(value)
    },
    switchInput(prop, val) {
      this.ruleForm[prop] = val ? 1 : 0
    },

    // 上级id转上级名
    treeIdToName(val) {
      const tmp = this.treeIdKey[val]
      return tmp ? tmp.name : ''
    },
    // 选择上级
    parentShow(item, type) {
      this.parentItem = item
      if (type === 'list') {
        this.parentListDialog = true
      } else {
        this.parentTreeDialog = true
      }
    },
    parentChange(data) {
      const tmp = {
        parentId: '',
        parentName: ''
      }
      if (Object.keys(data).length > 0) {
        const { id, name } = data
        tmp.parentId = id
        tmp.parentName = name
        tmp[this.parentItem.prop] = id
      }
      Object.assign(this.ruleForm, tmp)
    },

    // 提交表单
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        return valid
      })
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';

.el-select, .el-date-editor {
  width: 100%;
}

.plan {
  margin-bottom: $marginBottomMedium;
  .table-cloumns {
    display: inline-block;
    vertical-align: middle;
    @media screen and (max-width: 397px) {
      margin-top: 10px;
    }
  }
}
</style>
