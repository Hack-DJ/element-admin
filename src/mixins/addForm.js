import { validateEmpty } from '@/utils/validate'
import { requestForm } from '@/api/base'

const addForm = {
  data() {
    return {
      saveJson: false,
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
      this.formData = this._.cloneDeep(this.list[index])
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
      let json = data
      if (this.saveJson) {
        json = { json: data }
      }
      requestForm(this.saveUrl, json).then(res => {
        res = res.data.data
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
      let json = index
      if (this.saveJson) {
        if (!this._.isArray(index)) {
          json = { json: [this.list[index].id] }
        } else {
          json = { json: index }
        }
      }
      requestForm(this.deleteUrl, json).then(() => {
        if (this._.isArray(index)) {
          this.list = this.list.filter(item => !index.includes(item.id))
        } else {
          this.list.splice(index, 1)
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  }
}
export default addForm
