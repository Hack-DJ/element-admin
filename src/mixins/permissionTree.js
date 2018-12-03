import { mapGetters } from 'vuex'

const permissionTree = {
  data() {
    return {
      parentDialog: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      parentTempData: {}
    }
  },
  computed: {
    ...mapGetters([
      'permissionList',
      'permissionIdKey',
      'generationTree'
    ]),
    permissionIdToName() {
      console.log(this.ruleForm)
      const tmp = this.permissionIdKey[this.ruleForm.parentId]
      return tmp ? tmp.name : ''
    }
  },
  created() {
    this.getList()
  }
}
export default permissionTree
