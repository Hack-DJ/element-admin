<template>
  <div v-loading="loadingPage" class="app-container">
    <table-search :search="searchList" @searchList="searchChang" />
    <table-list :list="list" :columns="columns" :list-loading="listLoading" @edit="editForm" @delete="confirmDelete" @addForm="addForm" />
    <pagination v-show="count>0" :total="count" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <add-form
      :item-list="formItemList"
      :rules="rules"
      :form-data="formData"
      :form-title="formTitle"
      :show.sync="addDialog"
      @save="submitForm" />
  </div>
</template>

<script>
import { getList } from '@/api/dataSource'
import { PaginationMixin, TableSearchMixin, AddFormMixin, PageConfigMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'

export default {
  name: 'DataSourceList',
  components: { TableSearch, OperationPanel, AddForm, TableList, Pagination },
  mixins: [PaginationMixin, TableSearchMixin, AddFormMixin, PageConfigMixin],
  data() {
    return {
      loadingPage: true,
      pageName: '采集信息',
      // search 查询面板
      searchList: [],
      // table 表格
      list: [],
      listLoading: false,
      columns: [],
      optionList: [],

      // 表单弹窗
      formDialog: false,
      itemList: [],
      formData: {},
      rules: {
        websiteId: [
          { required: true, message: '请选择网站信息', trigger: 'blur' }
        ],
        databaseId: [
          { required: true, message: '请选择数据库表', trigger: 'blur' }
        ]
      },

      // json 请求接口
      saveJson: true,
      // 基础地址
      baseUrl: '/ips/a/ips/collectData'
    }
  },
  computed: {
    formItemList() {
      this.itemList.map(item => {
        if (item.prop === 'websiteId') {
          Object.assign(item, {
            baseUrl: '/ips/a/ips/website',
            name: 'websiteName'
          })
        }
        if (item.prop === 'collectTableId') {
          Object.assign(item, {
            baseUrl: '/ips/a/ips/collectTable',
            name: 'tableCode'
          })
        }
        if (['ftpUrl', 'ftpUser', 'ftpPsw', 'ftpPort', 'ftpDir'].includes(item.prop)) {
          item.control = {
            key: 'isFormat',
            table: 'collectData'
          }
        }
        return item
      })
      return this.itemList
    }
  },
  methods: {
    searchChang(data) {
      this.search = data
      this.getList()
    },
    getList() {
      // 设置格式化日期默认值
      this.formData.isFormat = '0'
      this.formDataTemp.isFormat = '0'

      getList(this.listUrl, Object.assign(this.listQuery, this.search)).then(res => {
        const data = res.data.data
        this.list = data.list
        this.count = data.count
        this.listQuery.pageNo = data.pageNo
        this.listQuery.pageSize = data.pageSize
        this.listLoading = false
      })
    },
    getParentType() {
      this.$store.dispatch('GetDataSourceType')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  /deep/ .el-form-item__label {
    width: 150px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 150px !important;
  }
}
</style>
