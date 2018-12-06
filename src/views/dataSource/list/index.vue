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
      :tree-list="dataSourceTypeTree"
      :tree-id-key="dataSourceTypeIdKey"
      :show.sync="addDialog"
      @save="submitForm" />
  </div>
</template>

<script>
import { getList } from '@/api/dataSource'
import { OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'

export default {
  name: 'DataSourceList',
  components: { TableSearch, OperationPanel, AddForm, TableList, Pagination },
  mixins: [OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin],
  data() {
    return {
      pageName: '采集信息',
      // search 查询面板
      searchList: [
        [
          {
            label: '网站信息',
            type: 'select',
            key: 'infoId',
            value: null,
            optionList: [{ label: 'a', value: 1 }, { label: 'b', value: 2 }, { label: 'c', value: 3 }]
          },
          {
            label: '数据格式化',
            type: 'select',
            key: 'format',
            value: null,
            optionList: [{ label: '是', value: '1' }, { label: '否', value: '0' }]
          },
          {
            label: '数据库表',
            type: 'select',
            key: 'tableId',
            value: null,
            optionList: [{ label: 'a表', value: '1' }, { label: 'b表', value: '0' }]
          }
        ]
      ],
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '网站信息',
          value: 'infoId'
        },
        {
          text: '数据格式化',
          switch: true,
          width: 60,
          value: 'format'
        },
        {
          text: '数据库表',
          value: 'tableId'
        },
        {
          text: 'ftp地址',
          value: 'ftp'
        },
        {
          text: 'ftp用户名',
          value: 'ftpUsername'
        },
        {
          text: 'ftp密码',
          value: 'ftpPassword'
        },
        {
          text: 'ftp文件地址',
          value: 'ftpFolder'
        }
      ],
      columnsReplace: {
        infoId: {
          '9dfbCf66-6fd3-8db9-dB23-5C23e13fb73d': '百度地图',
          '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD': '高德地图',
          '14B26EfC-08C4-15F3-dDFE-aBaefC911B16': '链家网',
          'Bb48934A-20BA-bfBb-9Dd4-bda5ebdDBbc8': '房天下网',
          'CDFA8a2b-e7A9-3Ec9-710A-eEB6c4DFCF8a': '315house网',
          'f62c973b-3E5f-8a7F-7b78-D69eeEE0d87E': '大众点评网',
          '9dEd388d-a1aa-EfeA-24CD-CFc99AD346eF': '美团网'
        },
        tableId: {
          '9dfbCf66-6fd3-8db9-dB23-5C23e13fb73d': 'IPO类数据库表',
          '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD': 'IPO类数据库表',
          '14B26EfC-08C4-15F3-dDFE-aBaefC911B16': '房产类数据库表',
          'Bb48934A-20BA-bfBb-9Dd4-bda5ebdDBbc8': '房产类数据库表',
          'CDFA8a2b-e7A9-3Ec9-710A-eEB6c4DFCF8a': '房产类数据库表',
          'f62c973b-3E5f-8a7F-7b78-D69eeEE0d87E': '餐饮类数据库表',
          '9dEd388d-a1aa-EfeA-24CD-CFc99AD346eF': '餐饮类数据库表'
        }
      },
      optionList: [],

      // 表单弹窗
      formDialog: false,
      formItemList: [
        {
          label: '网站信息',
          type: 'parent',
          inputType: 'list',
          placeholder: '请选择网站类型',
          prop: 'infoId',
          listUrl: 'http://code2012.cn/rapServer/app/mock/18/datasource/info',
          pageName: '选择网站信息',
          parentCloumnsList: [
            {
              text: '网站名',
              value: 'name'
            },
            {
              text: '网站url',
              value: 'url'
            },
            {
              text: '网站类型',
              value: 'typeId'
            }
          ],
          parentSearchCriteria: [
            [
              { label: '网站名', type: 'input', key: 'name', value: null },
              { label: '网站url', type: 'input', key: 'url', value: null },
              {
                label: '类型',
                type: 'select',
                key: 'typeId',
                value: null,
                optionList: [{ label: 'a', value: 1 }, { label: 'b', value: 2 }, { label: 'c', value: 3 }]
              }
            ]
          ]
        },
        {
          label: '数据格式化',
          type: 'switch',
          value: 1,
          prop: 'format'
        },
        {
          label: '数据库表',
          type: 'parent',
          inputType: 'list',
          placeholder: '请选择数据库表',
          prop: 'tableId',
          listUrl: 'http://code2012.cn/rapServer/app/mock/18/database/table',
          pageName: '选择网站信息',
          parentCloumnsList: [
            {
              text: '数据库',
              value: 'databaseId'
            },
            {
              text: '表名',
              value: 'name'
            },
            {
              text: '表类型',
              value: 'type'
            },
            {
              text: '表描述',
              value: 'descriptions'
            }
          ],
          parentSearchCriteria: [
            [
              { label: '数据库', type: 'input', key: 'databaseId', value: null },
              { label: '表名', type: 'input', key: 'name', value: null },
              { label: '表类型', type: 'input', key: 'type', value: null },
              { label: '表描述', type: 'input', key: 'descriptions', value: null }
            ]
          ]
        },
        {
          label: 'ftp地址',
          type: 'input',
          placeholder: '请输入ftp地址',
          prop: 'ftp'
        },
        {
          label: 'ftp用户名',
          type: 'input',
          placeholder: '请输入ftp用户名',
          prop: 'ftpUsername'
        },
        {
          label: 'ftp密码',
          type: 'input',
          placeholder: '请输入ftp密码',
          prop: 'ftpPassword'
        },
        {
          label: 'ftp文件地址',
          type: 'input',
          placeholder: '请输入ftp文件地址',
          prop: 'ftpFolder'
        }
      ],
      formData: {
        id: ''
      },
      rules: {
        infoId: [
          { required: true, message: '请选择网站信息', trigger: 'blur' }
        ],
        databaseId: [
          { required: true, message: '请选择数据库表', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'dataSourceTypeList',
      'dataSourceTypeIdKey',
      'dataSourceTypeTree'
    ])
  },
  created() {
    const tmp = {}
    this.formItemList.forEach(item => {
      tmp[item.prop] = item.value || ''
    })
    Object.assign(this.formData, tmp)
    this.formDataTemp = this._.cloneDeep(this.formData)
    this.getList()
    this.getParentType()
  },
  methods: {
    searchChang(data) {
      this.search = data
      this.getList()
    },
    getList() {
      getList(Object.assign(this.listQuery, this.search)).then(res => {
        this.list = res.data.list
        this.count = res.data.count
        this.listQuery.pageNo = res.data.pageNo
        this.listQuery.pageSize = res.data.pageSize
        this.listLoading = false
      })
    },
    getParentType() {
      this.$store.dispatch('GetDataSourceType')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';
</style>
