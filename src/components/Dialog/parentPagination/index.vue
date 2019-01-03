<template>
  <el-dialog :visible="show" :title="pageName" append-to-body @close="dialogClose">
    <table-search :search="searchList" @searchList="searchChang" />
    <table-list :is-operation-add="false" :is-dialog="true" :list="list" :columns="columns" :list-loading="listLoading" @current-change="handleCurrentChange" />
    <pagination v-if="count>0" :total="count" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <div class="dialog-foot-button-group">
      <el-button type="primary" @click="parentMenuConfirm">确定</el-button>
      <el-button @click="dialogClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import request from '@/utils/request'
import { PaginationMixin, TableSearchMixin, PageConfigMixin } from '@/mixins'
import TableSearch from '@/components/Table/TableSearch'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'

export default {
  name: 'DialogPagination',
  components: { TableSearch, TableList, Pagination },
  mixins: [PaginationMixin, TableSearchMixin, PageConfigMixin],
  props: {
    configData: {
      type: Object,
      default: () => {}
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      parentTempData: {},
      // table 表格
      searchList: [],
      columns: [],
      list: [],
      pageName: '',
      listLoading: true,
      search: {}
    }
  },
  computed: {
    baseUrl() {
      console.log(this.configData.baseUrl)
      return this.configData.baseUrl ? this.configData.baseUrl : ''
    }
  },
  methods: {
    getList() {
      const params = Object.assign(this.listQuery, this.search)
      request({
        url: this.listUrl,
        method: 'get',
        params
      }).then(res => {
        const data = res.data.data
        this.list = data.list
        this.count = data.count
        this.listQuery.pageNo = data.pageNo
        this.listQuery.pageSize = data.pageSize
        this.listLoading = false
      })
    },
    searchChang(data) {
      this.search = data
      this.getList()
    },
    handleCurrentChange(val) {
      this.parentTempData = val
    },
    parentMenuConfirm() {
      // 返回选中对象
      this.$emit('change', this.parentTempData)
      this.dialogClose()
    },
    dialogClose() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
