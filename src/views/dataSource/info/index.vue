<template>
  <div class="app-container">
    <table-search :search="searchList" @searchList="searchChang" />
    <operation-panel :option-list="optionList" :add-name="addName" @addForm="addForm" @checkChange="checkChange" />
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
import { getInfo } from '@/api/dataSource'
import { OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'

export default {
  name: 'DataSourceInfo',
  components: { TableSearch, OperationPanel, AddForm, TableList, Pagination },
  mixins: [OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin],
  data() {
    return {
      pageName: '信息',
      // search 查询面板
      searchList: [
        [
          { label: '网站名', type: 'input', key: 'name', value: null },
          { label: '网站url', type: 'input', key: 'url', value: null },
          {
            label: '类型',
            type: 'select',
            key: 'typeId',
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
      // 表单弹窗
      formDialog: false,
      formItemList: [
        {
          label: '网站名',
          type: 'input',
          placeholder: '请输入网站名',
          prop: 'name'
        },
        {
          label: '网站url',
          type: 'input',
          placeholder: '请输入网站url',
          prop: 'url'
        },
        {
          label: '网站类型',
          type: 'parent',
          placeholder: '请输入网站类型',
          prop: 'typeId'
        }
      ],
      formData: {
        id: '',
        name: '',
        url: '',
        typeId: ''
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
      getInfo(Object.assign(this.listQuery, this.search)).then(res => {
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
