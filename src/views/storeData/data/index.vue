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
import { fieldForm as formBaseData, getData } from '@/api/storeData'
import { OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'

export default {
  name: 'StoreDataData',
  components: { TableSearch, OperationPanel, AddForm, TableList, Pagination },
  mixins: [OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin],
  data() {
    const { itemList, ruleForm, rules } = formBaseData()
    return {
      pageName: '采集字段',
      // search 查询面板
      searchList: [
        [
          {
            label: '数据库表',
            type: 'select',
            key: 'collect_table_id',
            optionList: [{ label: '数据库表1', value: 1 }, { label: '数据库表2', value: 2 }, { label: '数据库表3', value: 3 }]
          },
          {
            label: '字段代码',
            type: 'input',
            key: 'field_code'
          },
          {
            label: '字段名',
            type: 'input',
            key: 'field_name'
          },
          {
            label: '字段长度',
            type: 'input',
            key: 'field_length'
          }
        ]
      ],
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '数据库表',
          value: 'collect_table_id_des'
        },
        {
          text: '字段代码',
          value: 'field_code'
        },
        {
          text: '字段名',
          value: 'field_name'
        },
        {
          text: '字段长度',
          value: 'field_length'
        },
        {
          text: '采集子表主键',
          value: 'slave_collect_table_id'
        },
        {
          text: '修改数据字段',
          width: 60,
          switch: true,
          value: 'is_update'
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
      getData(Object.assign(this.listQuery, this.search)).then(res => {
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
