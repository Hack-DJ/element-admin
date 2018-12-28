<template>
  <div class="app-container">
    基础表单
  </div>
</template>

<script>
import { getPageData } from '@/api/template'

export default {
  name: 'BaseTable',
  components: {},
  data() {
    return {
      // 页面基础数据
      pageData: {},
      pageName: '数据库',
      // table
      columns: [],
      // 表单
      formDialog: false,
      formData: {},
      itemList: [],
      rules: {},
      // 页面table 列表读取地址
      getList: '',
      // 页面保存地址
      saveUrl: ''
    }
  },
  created() {
    getPageData().then(res => {
      const data = res.data.data
      this.pageName = data.comments
      this.pageData = data.columnList
      this.formatPageData()
    })
  },
  methods: {
    formatPageData() {
      const formDate = {}
      const columns = []
      const itemList = []
      this.pageData.map(item => {

        const { name, javaField, isList, isInsert, isEdit, isQuery } = item

        // 表单存储对象
        formDate[item.javaField] = item.javaType === 'String' ? '' : null
        // tablie 展示对象
        if (item.isList === '0') {
          columns.push({
            text: name,
            value: javaField
          })
        }

        if (isInsert === '1' || isEdit === '1') {
          itemList.push({
            // label:
          })
        }
      })
      this.formData = formDate
      this.columns = columns
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';

.app-container {
}
</style>
