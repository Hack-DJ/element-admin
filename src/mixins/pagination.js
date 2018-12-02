const paginationMixin = {
  data() {
    return {
      count: 0,
      listQuery: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    }
  }
}
export default paginationMixin
