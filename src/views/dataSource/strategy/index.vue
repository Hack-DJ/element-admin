<template>
  <div class="app-container">
    <table-search :search="searchList" @searchList="searchChang" />
    <operation-panel :option-list="optionList" :add-name="addName" :option-select.sync="optionSelect" @addForm="addForm" />
    <table-list :list="list" :columns="cloumnsList" :list-loading="listLoading" @edit="editForm" @delete="confirmDelete" />
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
import { getStrategy } from '@/api/dataSource'
import { OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'

export default {
  name: 'DataSourceStrategy',
  components: { TableSearch, OperationPanel, AddForm, TableList, Pagination },
  mixins: [OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin],
  data() {
    return {
      pageName: '策略',
      // search 查询面板
      searchList: [
        [
          {
            label: '限制id',
            type: 'select',
            key: 'ipLimit',
            value: null,
            optionList: [{ label: '是', value: '1' }, { label: '否', value: '0' }]
          },
          {
            label: '用户代理',
            type: 'select',
            key: 'agent',
            value: null,
            optionList: [{ label: '是', value: '1' }, { label: '否', value: '0' }]
          },
          {
            label: 'Cookies',
            type: 'select',
            key: 'cookies',
            value: null,
            optionList: [{ label: '是', value: '1' }, { label: '否', value: '0' }]
          },
          {
            label: '验证码',
            type: 'select',
            key: 'verification',
            value: null,
            optionList: [{ label: '是', value: '1' }, { label: '否', value: '0' }]
          }
        ],
        [
          {
            label: 'js渲染',
            type: 'select',
            key: 'jsRender',
            value: null,
            optionList: [{ label: '是', value: '1' }, { label: '否', value: '0' }]
          },
          {
            label: 'ajax异步',
            type: 'select',
            key: 'requestAjax',
            value: null,
            optionList: [{ label: '是', value: '1' }, { label: '否', value: '0' }]
          },
          {
            label: '网站信息',
            type: 'select',
            key: 'infoId',
            value: null,
            optionList: [{ label: 'a', value: 1 }, { label: 'b', value: 2 }, { label: 'c', value: 3 }]
          },
          { label: '添加顺序', type: 'select', key: 'sort', value: null, optionList: [{ label: '时间由近到远', value: 1 }, { label: '时间由远到近', value: 2 }] }
        ]
      ],
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '网站信息',
          value: 'infoId_des'
        },
        {
          text: '单位时间内请求次数',
          value: 'requestNumber'
        },
        {
          text: '总请求次数',
          value: 'requestCount'
        }
      ],
      optionList: [
        {
          text: '限制id',
          switch: true,
          width: 60,
          value: 'ipLimit'
        },
        {
          text: '用户代理',
          switch: true,
          width: 60,
          value: 'agent'
        },
        {
          text: '支持cookies',
          switch: true,
          width: 60,
          value: 'cookies'
        },
        {
          text: '验证码',
          switch: true,
          width: 60,
          value: 'verification'
        },
        {
          text: 'js渲染',
          switch: true,
          width: 60,
          value: 'jsRender'
        },
        {
          text: 'ajax异步请求',
          switch: true,
          width: 60,
          value: 'requestAjax'
        }
      ],

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
          label: '限制id',
          type: 'switch',
          value: 1,
          prop: 'ipLimit'
        },
        {
          label: '请求次数',
          type: 'input',
          placeholder: '请输入单位时间内请求次数',
          prop: 'requestNumber'
        },
        {
          label: '总请求次数',
          type: 'input',
          placeholder: '请输入总请求次数',
          prop: 'requestCount'
        },
        {
          label: '用户代理',
          type: 'switch',
          value: 0,
          prop: 'agent'
        },
        {
          label: '支持cookies',
          type: 'switch',
          value: 1,
          prop: 'cookies'
        },
        {
          label: '验证码',
          type: 'switch',
          value: 1,
          prop: 'verification'
        },
        {
          label: 'js渲染',
          type: 'switch',
          value: 1,
          prop: 'jsRender'
        },
        {
          label: 'ajax异步请求',
          type: 'switch',
          value: 1,
          prop: 'requestAjax'
        }
      ],
      formData: {
        id: ''
      },
      rules: {
        infoId: [
          { required: true, message: '请选择网站信息', trigger: 'blur' }
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
      getStrategy(Object.assign(this.listQuery, this.search)).then(res => {
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
