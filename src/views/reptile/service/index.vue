<template>
  <div class="app-container">
    <table-search :search="searchList" @searchList="searchChang" />
    <operation-panel :option-list="optionList" :add-name="addName" :option-select.sync="optionSelect" @addForm="addForm" />
    <table-list :list="list" :columns="cloumnsList" :list-loading="listLoading" @edit="editForm" @delete="confirmDelete" />
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
import { getService } from '@/api/reptile'
import { OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'

export default {
  name: 'ReptileService',
  components: { TableSearch, OperationPanel, AddForm, TableList, Pagination },
  mixins: [OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin],
  data() {
    return {
      pageName: '爬虫服务',
      // search 查询面板
      searchList: [
        [
          {
            label: '爬虫名',
            type: 'input',
            value: null,
            key: 'name'
          },
          {
            label: '版本号',
            type: 'input',
            key: 'version',
            value: null
          },
          {
            label: '服务器ip',
            type: 'input',
            key: 'ip',
            value: null
          }
        ]
      ],
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '名称',
          value: 'name'
        },
        {
          text: '端口',
          value: 'port'
        },
        {
          text: '版本号',
          value: 'version'
        },
        {
          text: '代理服务器',
          value: 'ip'
        }
      ],
      // 表单弹窗
      formDialog: false,
      formItemList: [
        {
          label: '名称',
          type: 'input',
          placeholder: '请输入爬虫服务名称',
          prop: 'name'
        },
        {
          label: '代理服务器',
          type: 'input',
          placeholder: '请输入爬虫代理服务器IP',
          prop: 'ip'
        },
        {
          label: '端口',
          type: 'input',
          placeholder: '请输入爬虫代理服务器端口',
          prop: 'port'
        },
        {
          label: '版本号',
          type: 'input',
          placeholder: '请输入爬虫服务版本号',
          prop: 'version'
        }
      ],
      formData: {
        id: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入爬虫服务名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const tmp = {}
    this.formItemList.forEach(item => {
      tmp[item.prop] = item.value || ''
    })
    Object.assign(this.formData, tmp)
    this.formDataTemp = this._.cloneDeep(this.formData)
    this.getList()
  },
  methods: {
    searchChang(data) {
      this.search = data
      this.getList()
    },
    getList() {
      getService(Object.assign(this.listQuery, this.search)).then(res => {
        this.list = res.data.list
        this.count = res.data.count
        this.listQuery.pageNo = res.data.pageNo
        this.listQuery.pageSize = res.data.pageSize
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';
</style>
