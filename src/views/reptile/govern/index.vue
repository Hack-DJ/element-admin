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
import { getGovern } from '@/api/reptile'
import { OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'

export default {
  name: 'ReptileGovern',
  components: { TableSearch, OperationPanel, AddForm, TableList, Pagination },
  mixins: [OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin],
  data() {
    return {
      pageName: '服务治理',
      // search 查询面板
      searchList: [
        [
          {
            label: '服务任务id',
            type: 'input',
            value: null,
            key: 'serviceTaskId'
          },
          {
            label: '信息分类',
            type: 'input',
            key: 'name',
            value: null
          }
        ]
      ],
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '服务任务id',
          value: 'serviceTaskId'
        },
        {
          text: '信息分类',
          value: 'name'
        },
        {
          text: '详情',
          value: 'details'
        }
      ],
      columnsReplace: {
        serviceTaskId: {
          '9dfbCf66-6fd3-8db9-dB23-5C23e13fb73d': '网页地址',
          '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD': '图片地址',
          '14B26EfC-08C4-15F3-dDFE-aBaefC911B16': '房屋配套',
          'Bb48934A-20BA-bfBb-9Dd4-bda5ebdDBbc8': '详细地址',
          'CDFA8a2b-e7A9-3Ec9-710A-eEB6c4DFCF8a': '区县',
          'f62c973b-3E5f-8a7F-7b78-D69eeEE0d87E': '小区',
          '9dEd388d-a1aa-EfeA-24CD-CFc99AD346eF': '朝向楼层'
        }
      },
      optionList: [],
      // 表单弹窗
      formDialog: false,
      formItemList: [
        {
          label: '服务任务',
          type: 'parent',
          inputType: 'list',
          placeholder: '请选择爬虫服务任务',
          prop: 'serviceTaskId',
          listUrl: 'http://code2012.cn/rapServer/app/mock/18/reptile/servicetask',
          pageName: '服务任务',
          parentCloumnsList: [
            {
              text: '服务id',
              value: 'serviceId'
            },
            {
              text: '任务id',
              value: 'taskId'
            }
          ],
          parentSearchCriteria: [
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
          parentReplace: {
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
          }
        },
        {
          label: '信息分类',
          type: 'input',
          placeholder: '请输入分类名',
          prop: 'name'
        },
        {
          label: '详情',
          type: 'input',
          inputType: 'textarea',
          placeholder: '请输入详情',
          prop: 'details'
        }
      ],
      formData: {
        id: ''
      },
      rules: {
        serviceTaskId: [
          { required: true, message: '请选择服务任务', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入分类名', trigger: 'blur' }
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
      getGovern(Object.assign(this.listQuery, this.search)).then(res => {
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
