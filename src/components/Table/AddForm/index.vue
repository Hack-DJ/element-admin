<template>
  <el-dialog v-if="show" :visible="show" :title="formTitle" @close="formDialogHide">
    <form-plan ref="formPlan" :form-data="formData" :rules="rules" :item-list="itemList" :tree-list="treeList" :tree-id-key="treeIdKey">
      <el-form-item slot="formBtn">
        <el-button :loading="addFormLoading" type="primary" @click="submitForm">确定</el-button>
        <el-button v-if="showConfig" @click="configClick">{{ configName }}</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </form-plan>
  </el-dialog>
</template>

<script>

import FormPlan from '@/components/Table/FormPlan'
import { mapGetters } from 'vuex'

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
    // 配置按钮
    showConfig: {
      type: Boolean,
      default: false
    },
    configName: {
      type: String,
      default: '配置'
    },
    // 树菜单
    treeList: {
      type: Array,
      default: () => []
    },
    treeIdKey: {
      type: Object,
      default: () => { return {} }
    }
  },
  computed: {
    ...mapGetters([
      'addFormLoading'
    ])
  },
  watch: {
    show(val) {
      !val && this.$store.dispatch('hideAddFormLoading')
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
    getRuleForm() {
      return this.$refs.formPlan
    },
    // 提交重置表单
    submitForm() {
      const formPlan = this.getRuleForm()
      formPlan.submitForm().then(data => {
        this.$store.dispatch('showAddFormLoading')
        this.$emit('save', data)
      })
    },
    resetForm() {
      const formPlan = this.getRuleForm()
      formPlan.resetForm()
    }
  }
}
</script>
