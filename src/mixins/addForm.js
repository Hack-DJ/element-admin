import { validateEmpty } from '@/utils/validate'
import { requestForm } from '@/api/addForm'

const addForm = {
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
      this.formData = this._.cloneDeep(this.formDataTemp)
      this.addDialogShow()
    },
    editForm(index) {
      this.formData = this.list[index]
      this.addDialogShow()
    },
    addDialogShow() {
      this.addDialog = true
    },
    switchToggle(row) {
      this.submitForm(this._.pick(row, Object.keys(this.formData)))
    },
    // 提交表单
    submitForm(data) {
      // 格式化存储数据

      const json = { json: data }

      requestForm(this.saveUrl, json).then(res => {
        res = this._.pick(res.data.data, Object.keys(this.formData))
        let isNew = true
        this.list.some(item => {
          if (item.id === res.id) {
            isNew = false
            return Object.assign(item, res)
          }
        })
        if (isNew) {
          this.list.unshift(res)
        }
        this.addDialog = false
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      })
    },
    // 删除数据
    confirmDelete(index) {
      requestForm(this.deleteUrl, this.list[index]).then(() => {
        this.list.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  }
}
export default addForm
