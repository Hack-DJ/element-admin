<template>
  <div class="app-container">
    <operation-panel :option-list="optionList" :add-name="addName" @addForm="addForm" />
    <table-list :list="list" :columns="cloumnsList" :list-loading="listLoading" @edit="editForm" @delete="confirmDelete" />
    <add-form
      :item-list="itemList"
      :rules="rules"
      :form-data="formData"
      :form-title="formTitle"
      :show.sync="addDialog"
      @save="submitForm" />
  </div>
</template>

<script>

import { databaseForm as formBaseData } from '@/api/storedata'
import { getLibrary } from '@/api/storeData'
import { OperationMixin, AddFormMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'

export default {
  name: 'StoreDataLibrary',
  components: { TableSearch, OperationPanel, AddForm, TableList },
  mixins: [OperationMixin, AddFormMixin],
  data() {
    const { itemList, ruleForm, rules } = formBaseData()
    return {
      pageName: '数据库',
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '名称',
          value: 'database_name'
        },
        {
          text: '地址',
          value: 'database_url'
        },
        {
          text: '端口',
          value: 'database_port'
        },
        {
          text: '用户名',
          value: 'login_user'
        },
        {
          text: '密码',
          value: 'login_psw'
        },
        {
          text: '备注',
          value: 'remarks'
        }
      ],
      // 表单弹窗
      formDialog: false,
      itemList: itemList,
      formData: ruleForm,
      rules: rules
    }
  },
  created() {
    this.formDataTemp = this._.cloneDeep(this.formData)
    this.getList()
  },
  methods: {
    getList() {
      getLibrary().then(res => {
        this.list = res.data.list
        this.listLoading = false
      })
    }
  }
}
</script>
