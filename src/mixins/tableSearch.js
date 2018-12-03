const tableSearch = {
  data() {
    return {
      searchList: [],
      search: {}
    }
  },
  methods: {
    searchChang(data) {
      this.search = data
      this.getList()
    }
  }
}
export default tableSearch
