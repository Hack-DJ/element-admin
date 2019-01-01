<template>
  <div class="app-container">
    <table-search :search="searchList" @searchList="searchChang" />
    <table-list
      :list="list"
      :columns="columns"
      :list-loading="loading"
      is-select
      @edit="editForm"
      @delete="confirmDelete"
      @addForm="addForm" />
    <pagination v-if="count>0" :total="count" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <add-form
      :item-list="itemList"
      :rules="rules"
      :form-data="formData"
      :show.sync="addDialog"
      :form-title="formTitle"
      @save="submitForm" />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { requestForm } from '@/api/addForm'
import { PaginationMixin, AddFormMixin } from '@/mixins'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import Pagination from '@/components/Pagination'
import TableList from '@/components/Table/TableList'

export default {
  name: 'PageList',
  components: {
    TableSearch,
    TableList,
    AddForm,
    Pagination
  },
  mixins: [
    PaginationMixin, AddFormMixin
  ],
  props: {
    formatFormData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: true,
      search: {},
      parentId: {
        parentId: null
      },
      formData: {},
      list: []
    }
  },
  computed: {
    // table展示字段
    columns: function() {
      return this.formatFormData.config ? this.formatFormData.config.columns : []
    },
    // 搜索字段
    searchList: function() {
      return this.formatFormData.config ? this.formatFormData.config.searchList : []
    },
    // 获取列表URL
    listUrl: function() {
      return this.formatFormData.config ? this.formatFormData.config.listUrl : ''
    },
    // 获取列表URL
    rules: function() {
      return this.formatFormData.config ? this.formatFormData.config.rules : {}
    },
    // 新增控件
    itemList: function() {
      return this.formatFormData.config ? this.formatFormData.config.itemList : []
    }
  },
  watch: {
    formatFormData: {
      handler(val) {
        if (val.config) {
          this.loading = true
          this.parentId.parentId = val.id !== -1 ? val.id : null
          this.formData = val.config.ruleForm ? val.config.ruleForm : {}
          this.formDataTemp = val.config.ruleForm ? val.config.ruleForm : {}
          this.pageName = val.config.formTitle ? val.config.formTitle : ''
          this.getList()
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    searchChang(data) {
      this.search = data
      this.getList()
    },
    getList() {
      // 获取列表
      getList(this.listUrl, Object.assign(this.listQuery, this.search, this.parentId)).then(res => {
        const data = res.data
        this.list = data.list
        this.count = data.count
        this.listQuery.pageNo = data.pageNo
        this.listQuery.pageSize = data.pageSize
        this.loading = false
      })
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
      const deleteData = this._.isArray(index) ? { ids: index } : this.list[index]
      requestForm(this.deleteUrl, deleteData).then(() => {
        this.list.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  }
}
</script>
