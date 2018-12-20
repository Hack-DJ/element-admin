<template>
  <div class="app-container">
    <operation-panel :option-list="optionList" :add-name="addName" @addForm="addForm" />
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
          value: 'database_name'
        },
        {
          text: '地址',
          value: 'database_url'
        },
        {
          text: '端口',
          value: 'database_port'
        },
        {
          text: '用户名',
          value: 'login_user'
        },
        {
          text: '密码',
          value: 'login_psw'
        },
        {
          text: '备注',
          value: 'remarks'
        }
      ],
      // 表单弹窗
      formDialog: false,
      formItemList: [
        {
          label: '数据库名',
          type: 'input',
          placeholder: '请输入数据库名',
          prop: 'database_name'
        },
        {
          label: '数据库地址',
          type: 'input',
          placeholder: '请输入数据库URL或IP地址',
          prop: 'database_url'
        },
        {
          label: '端口',
          type: 'input',
          placeholder: '请输入数据库端口',
          prop: 'database_port'
        },
        {
          label: '用户名',
          type: 'input',
          placeholder: '请输入数据库登录用户名',
          prop: 'login_user'
        },
        {
          label: '密码',
          type: 'input',
          placeholder: '请输入数据库登录密码',
          prop: 'login_psw'
        },
        {
          label: '备注',
          type: 'input',
          inputType: 'textarea',
          placeholder: '请输入数据库备注',
          prop: 'remarks'
        }
      ],
      formData: {
        id: ''
      },
      rules: {
        database_name: [
          { required: true, message: '请输入数据库名称', trigger: 'blur' }
        ],
        database_url: [
          { required: true, message: '请输入数据库地址', trigger: 'blur' }
        ],
        database_port: [
          { required: true, message: '请输入数据库端口', trigger: 'blur' }
        ],
        login_user: [
          { required: true, message: '请输入数据库登录用户名', trigger: 'blur' }
        ],
        login_psw: [
          { required: true, message: '请输入数据库登录密码', trigger: 'blur' }
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
