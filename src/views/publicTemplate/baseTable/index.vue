<template>
  <div v-loading="loadingPage" class="app-container">
    <base-table-search v-if="isSearch" :search="searchList" />
    <operation-panel :is-add="isAdd" @add="add" />
    <table-list v-if="isTableList" :list="list" :columns="columns" :list-loading="listLoading" />
    <pagination :total="count" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <add-panel :form-title="pageName" :show.sync="formDialog" :form-data="formData" :rules="rules" :item-list="itemList" />
  </div>
</template>

<script>
import { formatPageData } from '@/utils'
import { OperationMixin, PaginationMixin } from '@/mixins'
import { getPageData } from '@/api/template'
import BaseTableSearch from './components/BaseTableSearch.vue'
import OperationPanel from './components/OperationPanel.vue'
import TableList from './components/TableList.vue'
import AddPanel from './components/addPanel.vue'
import Pagination from './components/Pagination.vue'

export default {
  name: 'BaseTable',
  components: {
    BaseTableSearch,
    Pagination,
    TableList,
    AddPanel,
    OperationPanel
  },
  mixins: [
    OperationMixin,
    PaginationMixin
  ],
  data() {
    return {
      loadingPage: true,
      listLoading: false,
      // 页面基础数据
      pageData: {},
      pageName: '',
      // 搜索列表
      searchList: [],
      // table
      columns: [],
      list: [],
      isAdd: false,
      isEdit: false,
      // 表单
      formDialog: false,
      formData: {},
      itemList: [],
      rules: {},
      // 页面table 列表读取地址
      listUrl: '',
      // 页面保存地址
      saveUrl: ''
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
  created() {
    getPageData().then(res => {
      this.loadingPage = false
      const data = res.data.data
      this.pageName = data.comments
      this.pageData = data.columnList

      const { formDate, columns, itemList, searchList } = formatPageData(data.columnList)

      this.formData = formDate
      this.columns = columns
      this.itemList = itemList
      this.searchList = searchList
    }).catch(() => {
      this.loadingPage = false
      this.$message.error('页面加载失败，请稍后再试！')
    })
    this.getList()
  },
  methods: {
    // 获取table列表
    getList() {},
    // 新增功能
    add() {
      this.formDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';

.app-container {
}
</style>
