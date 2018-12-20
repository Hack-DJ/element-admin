<template>
  <div>
    <el-dialog v-if="show" :visible="show" :title="formTitle" @close="formDialogHide">
      <form-plan :form-data="formData" :rules="rules" :item-list="itemList" :tree-list="treeList" :tree-id-key="treeIdKey">
        <el-form-item slot="formBtn">
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button v-if="showConfig" @click="configClick">{{ configName }}</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </form-plan>
    </el-dialog>
  </div>
</template>

<script>

import FormPlan from '@/components/Table/FormPlan'

export default {
  name: 'AddForm',
  components: {
    FormPlan
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
  methods: {
    // 添加弹窗隐藏
    formDialogHide() {
      this.$emit('update:show', false)
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
    }
  }
}
</script>
