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
      return !this.formIsEdit ? `新增${this.pageName}` : `修改${this.pageName}`
    },
    addName() {
      return `新增${this.pageName}`
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
    addDialogShow() {
      this.addDialog = true
    },
    // 提交表单
    submitForm(data) {
      // 格式化存储数据
      let isNew = true
      this.list.map(item => {
        if (item.id === data.id) {
          isNew = false
          return Object.assign(item, data)
        }
      })
      if (isNew) {
        this.list.unshift(data)
      }
      this.addDialog = false
      this.$message({
        type: 'success',
        message: '保存成功!'
      })
    },
    // 删除数据
    confirmDelete(index) {
      this.list.splice(index, 1)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    }
  }
}
export default tableSearch
