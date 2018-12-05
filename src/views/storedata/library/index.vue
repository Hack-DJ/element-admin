<template>
  <div class="app-container">
    <operation-panel :option-list="optionList" :add-name="addName" @addForm="addForm" @checkChange="checkChange" />
    <table-list :list="list" :columns="cloumnsList" :list-loading="listLoading" @edit="editForm" @delete="confirmDelete" />
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
import { getLibrary } from '@/api/storeData'
import { OperationMixin, AddFormMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'

export default {
  name: 'StoreDataLibrary',
  components: { TableSearch, OperationPanel, AddForm, TableList },
  mixins: [OperationMixin, AddFormMixin],
  data() {
    return {
      pageName: '数据库',
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '名称',
          value: 'name'
        },
        {
          text: '地址',
          value: 'host'
        },
        {
          text: '端口',
          value: 'port'
        },
        {
          text: '用户名',
          value: 'login'
        },
        {
          text: '密码',
          value: 'password'
        }
      ],
      // 表单弹窗
      formDialog: false,
      formItemList: [
        {
          label: '数据库名',
          type: 'input',
          placeholder: '请输入数据库名',
          prop: 'name'
        },
        {
          label: '数据库地址',
          type: 'input',
          placeholder: '请输入数据库URL或IP地址',
          prop: 'host'
        },
        {
          label: '端口',
          type: 'input',
          placeholder: '请输入数据库端口',
          prop: 'port'
        },
        {
          label: '用户名',
          type: 'input',
          placeholder: '请输入数据库登录用户名',
          prop: 'login'
        },
        {
          label: '密码',
          type: 'input',
          placeholder: '请输入数据库登录密码',
          prop: 'password'
        }
      ],
      formData: {
        id: ''
      },
      rules: {
        value: [
          { required: true, message: '请输入键值', trigger: 'blur' }
        ],
        label: [
          { required: true, message: '请输入标签', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入类型', trigger: 'blur' }
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
    getList() {
      getLibrary().then(res => {
        this.list = res.data.list
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';
</style>
