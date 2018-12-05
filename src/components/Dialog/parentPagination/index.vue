<template>
  <el-dialog :visible="show" title="请选择" @close="dialogClose">
    <table-search :search="searchCriteria" @searchList="searchChang" />
    <table-list :is-dialog="true" :list="list" :columns="cloumnsList" :list-loading="listLoading" @current-change="handleCurrentChange" />
    <pagination v-show="count>0" :total="count" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <div class="dialog-foot-button-group">
      <el-button type="primary" @click="parentMenuConfirm">确定</el-button>
      <el-button @click="dialogClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import request from '@/utils/request'
import { PaginationMixin, TableSearchMixin } from '@/mixins'
import TableSearch from '@/components/Table/TableSearch'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'

export default {
  name: 'DialogPagination',
  components: { TableSearch, TableList, Pagination },
  mixins: [PaginationMixin, TableSearchMixin],
  props: {
    formData: {
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
      list: [],
      listLoading: true,
      search: {},

      pageName: '',
      listUrl: '',
      searchCriteria: [],
      cloumnsList: []
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.pageName = val.pageName
        this.listUrl = val.listUrl
        this.searchCriteria = val.parentSearchCriteria
        this.cloumnsList = val.parentCloumnsList
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const params = Object.assign(this.listQuery, this.search)
      request({
        url: this.listUrl,
        method: 'get',
        params
      }).then(res => {
        this.list = res.data.list
        this.count = res.data.count
        this.listQuery.pageNo = res.data.pageNo
        this.listQuery.pageSize = res.data.pageSize
        this.listLoading = false
      })
    },
    searchChang(data) {
      this.search = data
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
