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
          value: 'database_id'
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
          prop: 'database_id',
          listUrl: 'http://code2012.cn/rapServer/app/mock/18/storedata/library',
          pageName: '选择网站数据库',
          parentCloumnsList: [
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
          parentSearchCriteria: []
        },
        {
          label: '表名',
          type: 'input',
          placeholder: '请输入表名',
          prop: 'table_name'
        },
        {
          label: '表类型',
          type: 'input',
          placeholder: '请输入表类型',
          prop: 'table_type'
        },
        {
          label: '表code',
          type: 'input',
          placeholder: '请输入表code',
          prop: 'table_code'
        },
        {
          label: '备注',
          type: 'input',
          inputType: 'textarea',
          placeholder: '请输入备注',
          prop: 'descriptions'
        }
      ],
      formData: {
        id: ''
      },
      rules: {
        database_id: [
          { required: true, message: '请选择数据库', trigger: 'blur' }
        ],
        table_name: [
          { required: true, message: '请输入表名', trigger: 'blur' }
        ],
        table_type: [
          { required: true, message: '请输入表类型', trigger: 'blur' }
        ],
        table_code: [
          { required: true, message: '请输入表code', trigger: 'blur' }
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
