<template>
  <el-dialog :visible.sync="formDialog" :title="formTitle" @close="formDialogHide">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item v-for="item in itemList" :label="item.label" :prop="item.prop" :key="item.prop">
        <template v-if="item.type==='radio'">
          <el-radio v-model="ruleForm[item.prop]" label="1">菜单</el-radio>
          <el-radio v-model="ruleForm[item.prop]" label="2">按钮</el-radio>
        </template>
        <template v-if="item.type==='parent'">
          <slot name="parentId" />
        </template>
        <template v-if="item.type==='switch'">
          <el-switch :value="switchShow(ruleForm[item.prop])" @input="switchInput(item.prop,$event)" />
        </template>
        <template v-if="item.type==='input'">
          <el-input v-model="ruleForm[item.prop]" :type="item | inputType" :placeholder="item | placeholder" />
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button v-if="showConfig" @click="configClick">{{ configName }}</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>

export default {
  name: 'AddForm',
  filters: {
    placeholder(item) {
      return item.placeholder || '请输入内容'
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
      formDialog: this.show,
      ruleForm: {}
    }
  },
  computed: {},
  watch: {
    show(val, oldVal) {
      if (val !== oldVal) this.formDialog = val
    },
    formData: {
      handler(val) {
        this.ruleForm = this._.cloneDeep(val)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    formDialogHide() {
      this.$emit('update:show', this.formDialog)
    },
    switchShow(value) {
      return !!parseInt(value)
    },
    switchInput(prop, val) {
      this.ruleForm[prop] = val ? 1 : 0
    },
    configClick() {
      this.$emit('config')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('save', this.ruleForm)
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
