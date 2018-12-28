<template>
  <div class="app-container">
    <table-search :search="searchLists" @searchList="searchChang" />
    <operation-panel :option-list="optionList" :add-name="addName" :option-select.sync="optionSelect" @addForm="addForm" />
    <table-list :list="list" :columns="cloumnsList" :list-loading="listLoading" dict-plus @edit="editForm" @delete="confirmDelete" @addDict="addForm" />
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
import { getDictList } from '@/api/power'
import { OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'
import { requestForm } from '@/api/addForm'

export default {
  name: 'Dict',
  components: { TableSearch, OperationPanel, AddForm, TableList, Pagination },
  mixins: [OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin],
  data() {
    return {
      pageName: '字典',
      saveUrl: '/ips/a/sys/dict/save',
      deleteUrl: '/ips/a/sys/dict/delete',
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '键值',
          value: 'value'
        },
        {
          text: '标签',
          value: 'label'
        },
        {
          text: '类型',
          value: 'type'
        }
      ],
      optionList: [
        {
          text: '描述',
          value: 'description'
        },
        {
          text: '排序',
          value: 'sort'
        }
      ],

      // 表单弹窗
      formDialog: false,
      formData: {
        id: '',
        value: '',
        label: '',
        type: '',
        description: '',
        sort: 500
      },
      rules: {
        value: [
          { required: true, message: '请输入键值', trigger: 'blur' }
        ],
        label: [
          { required: true, message: '请输入标签', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入类型', trigger: 'blur' }
        ]
      },
      typeList: []
    }
  },
  computed: {

    // search 查询面板
    searchLists() {
      return [
        [
          { label: '类型', type: 'autocomplete', key: 'type', value: null, optionList: this.typeList }
        ]
      ]
    },

    formItemList() {
      return [
        {
          label: '键值',
          type: 'input',
          placeholder: '请输入键值',
          prop: 'value'
        },
        {
          label: '标签',
          type: 'input',
          placeholder: '请输入标签',
          prop: 'label'
        },
        {
          label: '类型',
          type: 'autocomplete',
          placeholder: '选择类型',
          optionList: this.typeList,
          prop: 'type'
        },
        {
          label: '描述',
          type: 'input',
          placeholder: '请输入描述',
          prop: 'description'
        },
        {
          label: '排序',
          type: 'input',
          placeholder: '排序由小到大顺序排列',
          prop: 'sort'
        }
      ]
    },

    sortMax() {
      let max = 0
      this.list.forEach(item => {
        max = Math.max(item.sort, max) + 100
      })
      return max
    }
  },
  created() {
    this.formDataTemp = this._.cloneDeep(this.formData)
    this.getList()
  },
  methods: {
    // 提交表单
    addForm(data = '') {
      this.formData = this._.cloneDeep(this.formDataTemp)
      this.formData.sort = this.sortMax
      if (data !== '') {
        Object.assign(this.formData, { type: data.type, sort: data.sort })
      }
      this.addDialogShow()
    },
    submitForm(data) {
      // 格式化存储数据
      requestForm(this.saveUrl, data).then(res => {
        res = this._.pick(res.data.data, Object.keys(this.formData))
        let isNew = true
        this.list.some(item => {
          if (item.id === res.id) {
            isNew = false
            return Object.assign(item, res)
          }
        })
        if (isNew) {
          // 在列表中查找相同类型，然后根据相同类型查找合适位置
          let index = 0
          this.list.some((item, i) => {
            if (item.type === res.type) {
              // 有相同类型，则找排序位置
              if (item.sort > res.sort) {
                index = i
                return true
              }
              index = i + 1
            } else if (index !== 0) {
              return true
            }
          })
          this.list.splice(index, 0, res)
        }
        this.addDialog = false
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      })
    },
    searchChang(data) {
      this.search = data
      this.getList()
    },
    getList() {
      getDictList(Object.assign(this.listQuery, this.search)).then(res => {
        const data = res.data.data
        this.typeList = res.data.typeList

        this.list = data.list
        this.count = data.count
        this.listQuery.pageNo = data.pageNo
        this.listQuery.pageSize = data.pageSize
        this.listLoading = false
      })
    },
    checkChange(select) {
      this.optionSelect = select
    }
  }
}
</script>

