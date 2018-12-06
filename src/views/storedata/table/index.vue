<template>
  <div class="app-container">
    <table-search :search="searchList" @searchList="searchChang" />
    <operation-panel :option-list="optionList" :add-name="addName" :option-select.sync="optionSelect" @addForm="addForm" />
    <table-list :list="list" :columns="cloumnsList" :list-loading="listLoading" :columns-replace="columnsReplace" @edit="editForm" @delete="confirmDelete" />
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
    return {
      pageName: '数据库表',
      // search 查询面板
      searchList: [
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
          },
          {
            label: '表类型',
            type: 'select',
            key: 'type',
            value: null,
            optionList: [{ label: 'int', value: '0' }, { label: 'float', value: '1' }, { label: 'double', value: '2' }]
          }
        ]
      ],
      // table 表格
      list: [],
      listLoading: true,
      columns: [
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
      columnsReplace: {
        libraryId: {
          '9dfbCf66-6fd3-8db9-dB23-5C23e13fb73d': 'POI类',
          '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD': '房屋信息类',
          '14B26EfC-08C4-15F3-dDFE-aBaefC911B16': '团购外卖类',
          '14B26EfC-08C4-15F3-dDFE-aBaefC911ccd': '旅游类'
        }
      },

      // 表单弹窗
      formDialog: false,
      formItemList: [
        {
          label: '数据库',
          type: 'parent',
          inputType: 'list',
          placeholder: '请选择数据库',
          prop: 'libraryId',
          listUrl: 'http://code2012.cn/rapServer/app/mock/18/storedata/library',
          pageName: '选择网站数据库',
          parentCloumnsList: [
            {
              text: '名称',
              value: 'name'
            },
            {
              text: '地址',
              value: 'host'
            },
            {
              text: '端口',
              value: 'port'
            },
            {
              text: '用户名',
              value: 'login'
            },
            {
              text: '密码',
              value: 'password'
            }
          ],
          parentSearchCriteria: []
        },
        {
          label: '表名',
          type: 'input',
          prop: 'name'
        },
        {
          label: '表类型',
          type: 'select',
          placeholder: '请选中表类型',
          optionList: [{ label: 'int', value: '0' }, { label: 'float', value: '1' }, { label: 'double', value: '2' }],
          prop: 'type'
        },
        {
          label: '描述',
          type: 'input',
          placeholder: '请输入描述',
          prop: 'descriptions'
        }
      ],
      formData: {
        id: ''
      },
      rules: {
        libraryId: [
          { required: true, message: '请选择数据库', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入表名', trigger: 'blur' }
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
