const tagCache = {
  data() {
    return {
      getPageCache: {}
    }
  },
  created() {
    this.$store.dispatch('getPageCache', this.$route).then(res => {
      this.getPageCache = res || {}
    })
  },
  beforeRouteLeave(to, from, next) {
    const data = {
      form: this.$refs.pageCache.form,
      view: from
    }
    this.$store.dispatch('addViewCache', data)
    next()
  }
}
export default tagCache
