<template>
  <div class="app-container">
    <table-search :search="searchList" @searchList="searchChang" />
    <operation-panel :option-list="optionList" :add-name="addName" :option-select.sync="optionSelect" @addForm="addForm" />
    <table-list :list="list" :columns="cloumnsList" :list-loading="listLoading" @edit="editForm" @delete="confirmDelete" />
    <pagination v-show="count>0" :total="count" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
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
import { tableForm as formBaseData } from '@/api/storedata'
import { getTable } from '@/api/storeData'
import { OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'

export default {
  name: 'StoreDataTable',
  components: { TableSearch, OperationPanel, AddForm, TableList, Pagination },
  mixins: [OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin],
  data() {
    const { itemList, ruleForm, rules } = formBaseData()
    return {
      pageName: '数据库表',
      // search 查询面板
      searchList: [
        [
          {
            label: '数据库',
            type: 'select',
            key: 'database_id',
            value: null,
            optionList: [{ label: '数据库1', value: 1 }, { label: '数据库2', value: 2 }, { label: '数据库3', value: 3 }]
          },
          {
            label: '表名',
            type: 'input',
            key: 'table_name',
            value: null
          },
          {
            label: '表类型',
            type: 'input',
            key: 'table_type',
            value: null
          },
          {
            label: '表code',
            type: 'input',
            key: 'table_code',
            value: null
          }
        ]
      ],
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '数据库',
          value: 'database_id_des'
        },
        {
          text: '表名',
          value: 'table_name'
        },
        {
          text: '类型',
          value: 'table_type'
        },
        {
          text: '表code',
          value: 'table_code'
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
    searchChang(data) {
      this.search = data
      this.getList()
    },
    getList() {
      getTable(Object.assign(this.listQuery, this.search)).then(res => {
        this.list = res.data.list
        this.count = res.data.count
        this.listQuery.pageNo = res.data.pageNo
        this.listQuery.pageSize = res.data.pageSize
        this.listLoading = false
      })
    }
  }
}
</script>
