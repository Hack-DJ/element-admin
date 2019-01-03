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

    <!--:tree-list="dataSourceTypeTree"-->
    <!--:tree-id-key="dataSourceTypeIdKey"-->
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
// import { mapGetters } from 'vuex'

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
    // ...mapGetters([
    //   'dataSourceTypeList',
    //   'dataSourceTypeIdKey',
    //   'dataSourceTypeTree'
    // ]),
    formItemList() {
      this.itemList.map(item => {
        if (item.prop === 'websiteId') {
          // Object.assign(item, {
          //   type: 'parent',
          //   inputType: 'list',
          //   prop: 'websiteId',
          //   baseUrl: '/ips/a/ips/website',
          //   listUrl: '/list',
          //   pageName: '选择网站信息',
          //   parentCloumnsList: [
          //     {
          //       text: '网站名',
          //       value: 'website_name'
          //     },
          //     {
          //       text: '网站url',
          //       value: 'website_url'
          //     },
          //     {
          //       text: '网站类型',
          //       value: 'website_type',
          //       dictType: 'websiteType'
          //     }
          //   ],
          //   parentSearchCriteria: [
          //     { label: '网站名', type: 'input', key: 'website_name' },
          //     { label: '网站url', type: 'input', key: 'website_url' },
          //     { label: '网站类型', type: 'select', key: 'website_type', dictType: 'webType' }
          //   ]
          // })
          Object.assign(item, {
            baseUrl: '/ips/a/ips/website',
            listUrl: '/list',
            pageName: '选择网站'
          })
        }
        if (item.prop === 'collectTableId') {
          // Object.assign(item, {
          //   type: 'parent',
          //   inputType: 'list',
          //   prop: 'tableId',
          //   listUrl: 'http://code2012.cn/rapServer/app/mock/18/database/table',
          //   pageName: '选择网站信息',
          //   parentCloumnsList: [
          //     {
          //       text: '数据库',
          //       value: 'databaseId'
          //     },
          //     {
          //       text: '表名',
          //       value: 'name'
          //     },
          //     {
          //       text: '表类型',
          //       value: 'type'
          //     },
          //     {
          //       text: '表描述',
          //       value: 'descriptions'
          //     }
          //   ],
          //   parentSearchCriteria: [
          //     [
          //       { label: '表名', type: 'input', key: 'name', value: null },
          //       { label: '表类型', type: 'input', key: 'type', value: null },
          //       { label: '表描述', type: 'input', key: 'descriptions', value: null }
          //     ]
          //   ]
          // })
          Object.assign(item, {
            baseUrl: '/ips/a/ips/website',
            listUrl: '/list',
            pageName: '选择表'
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

      getList(Object.assign(this.listQuery, this.search)).then(res => {
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
