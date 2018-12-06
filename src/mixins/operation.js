const operation = {
  data() {
    return {
      optionList: [],
      optionSelect: []
    }
  },
  computed: {
    cloumnsList() {
      return this.columns.concat(this.optionSelect)
    }
  }
}
export default operation
