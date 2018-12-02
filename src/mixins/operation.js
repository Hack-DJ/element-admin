const operation = {
  data() {
    return {
      optionSelect: []
    }
  },
  computed: {
    cloumnsList() {
      return this.columns.concat(this.optionSelect)
    }
  },
  methods: {
    checkChange(select) {
      this.optionSelect = select
    }
  }
}
export default operation
