<template>
  <div>
    <el-dialog :visible="show" :title="formTitle" @close="formDialogHide">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item v-for="item in itemList" :label="item.label" :prop="item.prop" :key="item.prop">
          <template v-if="item.type==='radio'">
            <el-radio v-for="option in item.optionList" v-model="ruleForm[item.prop]" :label="option.value" :key="option.value">{{ option.label }}</el-radio>
          </template>
          <template v-if="item.type==='menu'">
            <el-input v-model="permissionIdToName" clearable readonly placeholder="空为一级菜单">
              <el-button slot="append" icon="el-icon-search" @click="parentDialog=true" />
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
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button v-if="showConfig" @click="configClick">{{ configName }}</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <dialog-icon :show.sync="iconDialog" :icon.sync="ruleForm.icon" />
    <permission-tree :show.sync="parentDialog" @change="parentTree" />
  </div>
</template>

<script>

import { DialogIcon, PermissionTree } from '@/components/Dialog'
import { mapGetters } from 'vuex'

export default {
  name: 'AddForm',
  components: {
    DialogIcon,
    PermissionTree
  },
  filters: {
    placeholder(item) {
      return item.placeholder || item.type === 'select' ? '请选择' : '请输入内容'
    },
    inputType(item) {
      return item.inputType || 'text'
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    showConfig: {
      type: Boolean,
      default: false
    },
    configName: {
      type: String,
      default: '配置'
    },
    formTitle: {
      type: String,
      default: '添加'
    },
    formData: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    },
    itemList: { type: Array, default: () => [] }
  },
  data() {
    return {
      ruleForm: {},
      // icon弹窗
      iconDialog: false,
      // 菜单父级树弹窗
      parentDialog: false
    }
  },
  computed: {
    ...mapGetters([
      'permissionList',
      'permissionIdKey',
      'generationTree'
    ]),
    permissionIdToName() {
      const tmp = this.permissionIdKey[this.ruleForm.parentId]
      return tmp ? tmp.name : ''
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
    // 添加框隐藏
    formDialogHide() {
      this.$emit('update:show', false)
    },
    // switch按钮
    switchShow(value) {
      return !!parseInt(value)
    },
    switchInput(prop, val) {
      this.ruleForm[prop] = val ? 1 : 0
    },
    // 配置按钮
    configClick() {
      this.$emit('config')
    },
    // 提交重置表单
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('save', this.ruleForm)
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    // 父树弹窗
    parentTree(data) {
      const tmp = {
        parentId: '',
        parentName: ''
      }
      if (Object.keys(data).length > 0) {
        const { id, name } = data
        tmp.parentId = id
        tmp.parentName = name
      }
      Object.assign(this.ruleForm, tmp)
    },
    // 通过控件控制表单隐藏
    formItemShow(item) {
      return item.isShow ? parseInt(this.ruleForm[item.isShow]) === 1 : true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';

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
