<script>
export default {
  name: 'Redirect',
  beforeCreate() {
    const { params, query } = this.$route
    const { path } = params
    console.log('beforeCreate', path)
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
