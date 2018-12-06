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
import { getTask } from '@/api/reptile'
import { OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'

export default {
  name: 'ReptileTask',
  components: { TableSearch, OperationPanel, AddForm, TableList, Pagination },
  mixins: [OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin],
  data() {
    return {
      pageName: '爬虫任务',
      // search 查询面板
      searchList: [
        [
          {
            label: '任务名',
            type: 'input',
            value: null,
            key: 'name'
          },
          {
            label: '任务状态',
            type: 'select',
            key: 'state',
            value: null,
            optionList: [{ label: '开始', value: 0 }, { label: '暂停', value: 1 }, { label: '介绍', value: 2 }]
          },
          {
            label: '开始时间',
            type: 'datetime',
            key: 'startTime',
            value: null
          },
          {
            label: '结束时间',
            type: 'datetime',
            key: 'endTime',
            value: null
          }
        ]
      ],
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '采集数据',
          value: 'listId'
        },
        {
          text: '任务名',
          value: 'name'
        },
        {
          text: '开始时间',
          value: 'startTime'
        },
        {
          text: '结束时间',
          value: 'endTime'
        },
        {
          text: '任务状态',
          value: 'state'
        }
      ],
      optionList: [
        {
          text: '任务间隔时间',
          value: 'interval'
        },
        {
          text: '失败重启次数',
          value: 'restart'
        },
        {
          text: '依赖触发层级',
          value: 'hierarchy'
        },
        {
          text: '启动方式',
          value: 'start'
        }
      ],
      columnsReplace: {
        listId: {
          '9dfbCf66-6fd3-8db9-dB23-5C23e13fb73d': '百度地图',
          '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD': '高德地图',
          '14B26EfC-08C4-15F3-dDFE-aBaefC911B16': '链家网',
          'Bb48934A-20BA-bfBb-9Dd4-bda5ebdDBbc8': '房天下网',
          'CDFA8a2b-e7A9-3Ec9-710A-eEB6c4DFCF8a': '315house网',
          'f62c973b-3E5f-8a7F-7b78-D69eeEE0d87E': '大众点评网',
          '9dEd388d-a1aa-EfeA-24CD-CFc99AD346eF': '美团网'
        },
        state: {
          0: '开始',
          1: '暂停',
          2: '停止'
        },
        start: {
          0: '自动',
          1: '手动'
        }
      },
      // 表单弹窗
      formDialog: false,
      formItemList: [
        {
          label: '采集数据',
          type: 'parent',
          inputType: 'list',
          placeholder: '请选择采集数据',
          prop: 'listId',
          listUrl: 'http://code2012.cn/rapServer/app/mock/18/datasource/list',
          pageName: '采集数据',
          parentCloumnsList: [
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
          parentSearchCriteria: [
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
          parentReplace: {
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
          }
        },
        {
          label: '任务名称',
          type: 'input',
          prop: 'name'
        },
        {
          label: '任务状态',
          type: 'select',
          placeholder: '请选择任务状态',
          optionList: [{ label: '开始', value: 0 }, { label: '暂停', value: 1 }, { label: '停止', value: 2 }],
          prop: 'state'
        },
        {
          label: '开始时间',
          type: 'datetime',
          placeholder: '请选择开始时间',
          prop: 'startTime'
        },
        {
          label: '结束时间',
          type: 'datetime',
          placeholder: '请选择开始时间',
          prop: 'endTime'
        },
        {
          label: '任务间隔时间',
          type: 'input',
          prop: 'interval'
        },
        {
          label: '失败重启次数',
          type: 'input',
          prop: 'restart'
        },
        {
          label: '依赖触发层级',
          type: 'input',
          prop: 'hierarchy'
        },
        {
          label: '启动方式',
          type: 'select',
          placeholder: '请选择启动方式',
          optionList: [{ label: '自动', value: 0 }, { label: '手动', value: 1 }],
          prop: 'start'
        }
      ],
      formData: {
        id: ''
      },
      rules: {
        listId: [
          { required: true, message: '请选择采集数据', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入任务名', trigger: 'blur' }
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
      getTask(Object.assign(this.listQuery, this.search)).then(res => {
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
