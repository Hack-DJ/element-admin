<template>
  <div v-loading="loadingPage" class="app-container">
    <base-table-search v-if="isSearch" :search="searchList" />
    <operation-panel :is-add="isAdd" @add="add" />
    <table-list v-if="isTableList" :list="list" :columns="columns" :list-loading="listLoading" />
    <pagination :total="count" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <add-panel :form-title="pageName" :show.sync="formDialog" :form-data="formData" :rules="rules" :item-list="itemList" />
  </div>
</template>

<script>
import { OperationMixin, PaginationMixin } from '@/mixins'
import { getPageData } from '@/api/template'
import BaseTableSearch from './components/BaseTableSearch.vue'
import OperationPanel from './components/OperationPanel.vue'
import TableList from './components/TableList.vue'
import AddPanel from './components/addPanel.vue'
import Pagination from './components/Pagination.vue'

export default {
  name: 'BaseTable',
  components: {
    BaseTableSearch,
    Pagination,
    TableList,
    AddPanel,
    OperationPanel
  },
  mixins: [
    OperationMixin,
    PaginationMixin
  ],
  data() {
    return {
      loadingPage: true,
      listLoading: false,
      // 页面基础数据
      pageData: {},
      pageName: '',
      // 搜索列表
      searchList: [],
      // table
      columns: [],
      list: [],

      // 表单
      formDialog: false,
      formData: {},
      itemList: [],
      rules: {},
      // 页面table 列表读取地址
      listUrl: '',
      // 页面保存地址
      saveUrl: ''
    }
  },
  computed: {
    isAdd() {
      return Object.keys(this.formData).length > 0
    },
    isSearch() {
      return this.searchList.length > 0
    },
    isTableList() {
      return this.columns.length > 0
    }
  },
  created() {
    getPageData().then(res => {
      this.loadingPage = false
      const data = res.data.data
      this.pageName = data.comments
      this.pageData = data.columnList
      this.formatPageData()
    }).catch(() => {
      this.loadingPage = false
      this.$message.error('页面加载失败，请稍后再试！')
    })
    this.getList()
  },
  methods: {
    // 获取table列表
    getList() {},
    // 新增功能
    add() {
      this.formDialog = true
    },
    formatPageData() {
      const formDate = {}
      const columns = []
      const itemList = []
      const searchList = []
      this.pageData.map(item => {
        const { name, javaField, isList, isInsert, isEdit, showType, isQuery, dictType, dataLength } = item

        // 查询控件
        if (isQuery === '1') {
          searchList.push(
            {
              label: name,
              key: javaField,
              type: showType,
              dictType: dictType
            }
          )
        }
        // tablie 展示对象
        if (isList === '1' || true) {
          // TODO table列表暂时没有
          columns.push({
            text: name,
            value: javaField
          })
        }

        // 添加表单
        if (isInsert === '1' || isEdit === '1') {
          itemList.push({
            label: name,
            type: showType,
            placeholder: this.placeholderText(showType, name),
            dictType: dictType,
            dataLength: dataLength,
            prop: javaField,
            isInser: isInsert === '1',
            isEdit: isEdit === '1'
          })
          // TODO 验证规则暂时没有
          // 表单存储对象
          formDate[item.javaField] = item.javaType === 'String' ? '' : null
          // TODO 存储地址展示没有
        }
      })

      this.formData = formDate
      this.columns = columns
      this.itemList = itemList
      this.searchList = searchList
    },
    placeholderText(type, name) {
      let str = ''
      switch (type) {
        case 'input':
          str = '请输入'
          break
        case 'select':
          str = '请选'
          break
      }
      return str + name
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';

.app-container {
}
</style>
