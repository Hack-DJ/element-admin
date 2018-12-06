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
import { getServiceTask } from '@/api/reptile'
import { OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'

export default {
  name: 'ReptileServiceStask',
  components: { TableSearch, OperationPanel, AddForm, TableList, Pagination },
  mixins: [OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin],
  data() {
    return {
      pageName: '服务任务',
      // search 查询面板
      searchList: [
        [
          {
            label: '服务',
            type: 'input',
            value: null,
            key: 'serviceId'
          },
          {
            label: '任务',
            type: 'input',
            key: 'taskId',
            value: null
          }
        ]
      ],
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '服务id',
          value: 'serviceId'
        },
        {
          text: '任务id',
          value: 'taskId'
        }
      ],
      columnsReplace: {
        taskId: {
          '9dfbCf66-6fd3-8db9-dB23-5C23e13fb73d': '网页地址',
          '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD': '图片地址',
          '14B26EfC-08C4-15F3-dDFE-aBaefC911B16': '房屋配套',
          'Bb48934A-20BA-bfBb-9Dd4-bda5ebdDBbc8': '详细地址',
          'CDFA8a2b-e7A9-3Ec9-710A-eEB6c4DFCF8a': '区县',
          'f62c973b-3E5f-8a7F-7b78-D69eeEE0d87E': '小区',
          '9dEd388d-a1aa-EfeA-24CD-CFc99AD346eF': '朝向楼层'
        },
        serviceId: {
          '9dfbCf66-6fd3-8db9-dB23-5C23e13fb73d': '阿里云POI',
          '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD': '阿里云房产',
          '14B26EfC-08C4-15F3-dDFE-aBaefC911B16': '腾讯云外卖餐饮',
          'Bb48934A-20BA-bfBb-9Dd4-bda5ebdDBbc8': '腾讯云旅游',
          'CDFA8a2b-e7A9-3Ec9-710A-eEB6c4DFCF8a': '阿里云外卖餐饮',
          'f62c973b-3E5f-8a7F-7b78-D69eeEE0d87E': '阿里云旅游',
          '9dEd388d-a1aa-EfeA-24CD-CFc99AD346eF': '腾讯云POI'
        }
      },

      // 表单弹窗
      formDialog: false,
      formItemList: [
        {
          label: '服务',
          placeholder: '请选择服务',
          prop: 'serviceId',
          type: 'parent',
          inputType: 'list',
          listUrl: 'http://code2012.cn/rapServer/app/mock/18/reptile/service',
          pageName: '服务',
          parentCloumnsList: [
            {
              text: '服务名',
              value: 'name'
            },
            {
              text: '版本',
              value: 'version'
            },
            {
              text: '服务器IP',
              value: 'ip'
            },
            {
              text: '端口',
              value: 'port'
            }
          ],
          parentSearchCriteria: [
            [
              {
                label: '服务名',
                type: 'input',
                value: null,
                key: 'name'
              },
              {
                label: '版本',
                type: 'input',
                key: 'version',
                value: null
              }
            ]
          ]
        },
        {
          label: '任务',
          prop: 'taskId',
          placeholder: '请选择任务',
          type: 'parent',
          inputType: 'list',
          listUrl: 'http://code2012.cn/rapServer/app/mock/18/reptile/task',
          pageName: '任务',
          parentCloumnsList: [
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
          parentSearchCriteria: [
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
              }
            ]
          ],
          parentReplace: {
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
          }
        }
      ],
      formData: {
        id: ''
      },
      rules: {
        serviceId: [
          { required: true, message: '请选择治理服务', trigger: 'blur' }
        ],
        taskId: [
          { required: true, message: '请选择任务', trigger: 'blur' }
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
      getServiceTask(Object.assign(this.listQuery, this.search)).then(res => {
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
