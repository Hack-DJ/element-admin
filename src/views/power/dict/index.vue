<template>
  <div class="app-container">
    <table-search :search="searchList" @searchList="searchChang" />
    <operation-panel :option-list="optionList" add-name="新增字典" @addForm="addForm" @checkChange="checkChange" />
    <table-list :list="list" :columns="cloumnsList" :list-loading="listLoading" @edit="editForm" @delete="deleteForm" />
    <pagination v-show="count>0" :total="count" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <add-form
      :item-list="formItemList"
      :rules="rules"
      :form-data="formData"
      :form-title="formTitle"
      :show.sync="formDialog" />
  </div>
</template>

<script>
import { getDictList } from '@/api/power'
import operation from '@/mixins/operation'
import paginationMixin from '@/mixins/pagination'
import tableSearchMixin from '@/mixins/tableSearch'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'

export default {
  name: 'Dict',
  components: { TableSearch, OperationPanel, AddForm, TableList, Pagination },
  mixins: [operation, paginationMixin, tableSearchMixin],
  data() {
    return {
      // search 查询面板
      searchList: [
        [
          { label: '键值', type: 'input', key: 'value', value: null },
          { label: '标签', type: 'input', key: 'label', value: null },
          { label: '类型', type: 'select', key: 'type', value: null, optionList: [{ label: 'a', value: 1 }, { label: 'b', value: 2 }, { label: 'c', value: 3 }] },
          { label: '描述', type: 'input', key: 'description', value: null }
        ]
      ],
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
        },
        {
          text: '备注',
          value: 'remarks'
        }
      ],

      // 表单弹窗
      isNew: true,
      formDialog: false,
      formItemList: [
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
          type: 'input',
          placeholder: '请输入类型',
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
        },
        {
          label: '备注',
          type: 'input',
          inputType: 'textarea',
          placeholder: '请输入备注',
          prop: 'remarks'
        }
      ],
      formData: {
        id: '',
        value: '',
        label: '',
        type: '',
        remarks: '',
        description: '',
        sort: 500
      },
      formDataTemp: {},
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
      }
    }
  },
  computed: {
    formTitle() {
      return `${this.isNew ? '新增' : '修改'}字典`
    }
  },
  created() {
    this.formDataTemp = this._.cloneDeep(this.formData)
    this.getList()
  },
  methods: {
    searchChang(data) {
      this.search = data
      this.getList()
    },
    getList() {
      getDictList(Object.assign(this.listQuery, this.search)).then(res => {
        this.list = res.data.list
        this.count = res.data.count
        this.listQuery.pageNo = res.data.pageNo
        this.listQuery.pageSize = res.data.pageSize
        this.listLoading = false
      })
    },
    addForm() {
      this.isNew = true
      this.formData = this.formDataTemp
      this.formDialog = !this.formDialog
    },
    editForm(index) {
      this.isNew = false
      this.formData = this.list[index]
      this.formDialog = true
    },
    deleteForm(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';
</style>
