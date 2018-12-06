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
            label: '服务治理',
            type: 'input',
            value: null,
            key: 'governId'
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
          text: '服务治理id',
          value: 'governId'
        },
        {
          text: '任务id',
          value: 'taskId'
        }
      ],
      // 表单弹窗
      formDialog: false,
      formItemList: [
        {
          label: '治理服务',
          placeholder: '请选择治理服务',
          prop: 'governId',
          type: 'parent',
          inputType: 'list',
          listUrl: 'http://code2012.cn/rapServer/app/mock/18/reptile/govern',
          pageName: '数据库表',
          parentCloumnsList: [
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
          parentSearchCriteria: [
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
          ]
        },
        {
          label: '任务',
          prop: 'taskId',
          placeholder: '请选择任务',
          type: 'parent',
          inputType: 'list',
          listUrl: 'http://code2012.cn/rapServer/app/mock/18/reptile/task',
          pageName: '数据库表',
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
          ]
        }
      ],
      formData: {
        id: ''
      },
      rules: {
        governId: [
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
