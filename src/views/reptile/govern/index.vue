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
              text: '服务治理id',
              value: 'governId'
            },
            {
              text: '任务id',
              value: 'taskId'
            }
          ],
          parentSearchCriteria: [
            [
              {
                label: '服务治理id',
                type: 'input',
                value: null,
                key: 'governId'
              },
              {
                label: '任务id',
                type: 'input',
                key: 'taskId',
                value: null
              }
            ]
          ]
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
          intpuType: '',
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
