<template>
  <div v-loading="loadingPage" class="app-container">
    <table-search :search="searchList" @searchList="searchChang" />
    <table-list
      :list="list"
      :columns="columns"
      :list-loading="listLoading"
      :add-name="addName"
      is-delete-all
      is-select
      @edit="editForm"
      @delete="confirmDelete"
      @addForm="addForm" />
    <pagination :total="count" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <add-form
      :item-list="itemList"
      :rules="rules"
      :form-data="formData"
      :form-title="formTitle"
      :show.sync="addDialog"
      @save="submitForm" />
  </div>
</template>

<script>
import { PaginationMixin, TableSearchMixin, AddFormMixin, PageConfigMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'
import { requestForm, getList } from '@/api/base'

export default {
  name: 'DataSourceWebsite',
  components: { TableSearch, OperationPanel, AddForm, TableList, Pagination },
  mixins: [PaginationMixin, TableSearchMixin, AddFormMixin, PageConfigMixin],
  data() {
    return {
      loadingPage: true,
      pageName: '网站信息',
      // search 查询面板
      searchList: [],
      search: {},
      // table 表格
      list: [],
      listLoading: true,
      columns: [],

      // 表单弹窗
      formDialog: false,
      itemList: [],
      formData: {},
      rules: {
        websiteName: [
          { required: true, message: '请输入网站名', trigger: 'blur' }
        ],
        websiteUrl: [
          { required: true, message: '请输入网站URL', trigger: 'blur' },
          { type: 'url', message: '请输入正确URL', trigger: 'blur' }
        ],
        websiteType: [
          { required: true, message: '请选择网站类型', trigger: 'blur' }
        ],
        websiteToken: [
          { required: true, message: '请输入网站Token', trigger: 'blur' }
        ]
      },
      // json 请求接口
      saveJson: true,

      // 基础地址
      baseUrl: '/ips/a/ips/website'
    }
  },
  computed: {
    isSearch() {
      return this.searchList.length > 0
    },
    isTableList() {
      return this.columns.length > 0
    }
  },
  methods: {
    searchChang(data) {
      this.search = data
      this.getList()
    },
    getList() {
      this.listLoading = true
      getList(this.listUrl, Object.assign(this.listQuery, this.search)).then(res => {
        const data = res.data.data
        this.list = data.list
        this.count = data.count
        this.listQuery.pageNo = data.pageNo
        this.listQuery.pageSize = data.pageSize
        this.listLoading = false
      })
    },
    getParentType() {
      this.$store.dispatch('GetDataSourceType')
    },
    // 删除数据
    confirmDelete(index) {
      if (!this._.isArray(index)) {
        index = [this.list[index].id]
      }
      requestForm(this.deleteUrl, { json: index }).then(() => {
        this.list = this.list.filter(item => !index.includes(item.id))
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  }
}
</script>
