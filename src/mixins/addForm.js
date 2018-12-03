import { validateEmpty } from '@/utils/validate'

const tableSearch = {
  data() {
    return {
      pageName: '',
      addDialog: false,
      formDataTemp: {}
    }
  },
  computed: {
    formIsEdit() {
      return validateEmpty(this.formData.id)
    },
    formTitle() {
      return !this.formIsEdit ? `新增 ${this.pageName}` : `修改${this.pageName}`
    }
  },
  methods: {
    addForm() {
      this.formData = this.formDataTemp
      this.addDialogShow()
    },
    editForm(index) {
      this.formData = this.list[index]
      this.addDialogShow()
    },
    // 删除数据
    confirmDelete(index) {
      this.list.splice(index, 1)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    addDialogShow() {
      this.addDialog = true
    }
  }
}
export default tableSearch
