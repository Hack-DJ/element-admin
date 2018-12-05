<template>
  <div class="app-container">
    <table-search :search="searchList" @searchList="searchChang" />
    <operation-panel :option-list="optionList" :add-name="addName" :option-select.sync="optionSelect" @addForm="addForm" @checkChange="checkChange" />
    <table-list :list="list" :columns="cloumnsList" :list-loading="listLoading" @edit="editForm" @delete="confirmDelete" />
    <pagination v-show="count>0" :total="count" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <add-form
      :item-list="formItemList"
      :rules="rules"
      :form-data="formData"
      :form-title="formTitle"
      :show.sync="addDialog"
      @save="submitForm" />
  </div>
</template>

<script>
import { getData } from '@/api/storeData'
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
    return {
      pageName: '采集内容',
      // search 查询面板
      searchList: [
        [
          {
            label: '数据库表',
            type: 'select',
            key: 'tableId',
            value: null,
            optionList: [{ label: '数据库表1', value: 1 }, { label: '数据库表2', value: 2 }, { label: '数据库表3', value: 3 }]
          },
          {
            label: '内容名',
            type: 'input',
            key: 'name',
            value: null
          },
          {
            label: '字段名',
            type: 'input',
            key: 'fieldName'
          },
          {
            label: '联合主键',
            type: 'select',
            optionList: [{ label: '是', value: 0 }, { label: '否', value: 1 }],
            key: 'primaryKey'
          }
        ]
      ],
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '数据库表',
          value: 'tableId'
        },
        {
          text: '内容名',
          value: 'name'
        },
        {
          text: '字段名',
          value: 'fieldName'
        },
        {
          text: '联合主键',
          width: 60,
          switch: true,
          value: 'primaryKey'
        }
      ],

      // 表单弹窗
      formDialog: false,
      formItemList: [
        {
          label: '数据库表',
          type: 'parent',
          inputType: 'list',
          placeholder: '请选择数据库表',
          prop: 'tableId',
          listUrl: 'http://code2012.cn/rapServer/app/mock/18/storedata/table',
          pageName: '数据库表',
          parentCloumnsList: [
            {
              text: '数据库',
              value: 'libraryId'
            },
            {
              text: '表名',
              value: 'name'
            },
            {
              text: '类型',
              value: 'type'
            },
            {
              text: '描述',
              value: 'descriptions'
            }
          ],
          parentSearchCriteria: [
            [
              {
                label: '数据库',
                type: 'select',
                key: 'libraryId',
                value: null,
                optionList: [{ label: '数据库1', value: 1 }, { label: '数据库2', value: 2 }, { label: '数据库3', value: 3 }]
              },
              {
                label: '表名',
                type: 'input',
                key: 'name',
                value: null
              }
            ]
          ]
        },
        {
          label: '内容名',
          type: 'input',
          prop: 'name'
        },
        {
          label: '字段名',
          type: 'input',
          placeholder: '请输入字段名',
          prop: 'fieldName'
        },
        {
          label: '联合主键',
          type: 'select',
          placeholder: '请选择联合主键',
          optionList: [{ label: '是', value: '0' }, { label: '否', value: '1' }],
          prop: 'primaryKey'
        }
      ],
      formData: {
        id: ''
      },
      rules: {
        tableId: [
          { required: true, message: '请选择数据库表', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入内容名', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const tmp = {}
    this.formItemList.forEach(item => {
      tmp[item.prop] = item.value || ''
    })
    Object.assign(this.formData, tmp)
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

<style lang="scss" scoped>
@import 'src/styles/var';
</style>
