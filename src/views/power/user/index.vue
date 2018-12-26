<template>
  <div class="app-container">
    <operation-panel add-name="新增用户" @addForm="addForm" />
    <table-list :list="list" :columns="columns" :list-loading="listLoading" power-config @config="configRole" @edit="editForm" @delete="confirmDelete" />
    <add-form
      :item-list="formItemList"
      :rules="rules"
      :form-data="formData"
      :form-title="formTitle"
      :show.sync="addDialog"
      config-name="配置角色"
      show-config
      @save="submitForm"
      @config="configRole" />
    <el-dialog :visible.sync="configDialog" title="配置角色">
      <el-table
        ref="multipleTable"
        :data="roleList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="configChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="角色名称">
          <template slot-scope="scope">{{ scope.row.oldName }}</template>
        </el-table-column>
        <el-table-column label="英文名">
          <template slot-scope="scope">{{ scope.row.oldEnname }}</template>
        </el-table-column>
        <el-table-column label="角色类型">
          <template slot-scope="scope">{{ scope.row.roleType }}</template>
        </el-table-column>
      </el-table>
      <div class="dialog-foot-button-group">
        <el-button @click="configDialog=false">取消</el-button>
        <el-button type="primary" @click="configSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { AddFormMixin } from '@/mixins'
import { validatePhone, validateEmpty } from '@/utils/validate'
import { getUserList, getRoleList } from '@/api/power'
import OperationPanel from '@/components/Table/OperationPanel'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'

export default {
  name: 'User',
  components: { OperationPanel, AddForm, TableList },
  mixins: [AddFormMixin],
  data() {
    const valiPhone = (rule, value, callback) => {
      if (!validateEmpty(value)) {
        callback()
      }
      if (!validatePhone(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      pageName: '用户',
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '登录名',
          value: 'loginName'
        },
        {
          text: '用户名',
          value: 'name'
        },
        {
          text: '手机',
          value: 'phone'
        },
        {
          text: '邮箱',
          value: 'email'
        },
        {
          text: '是否启用',
          value: 'loginFlag',
          width: 60,
          switch: true
        }
      ],
      // 表单弹窗
      saveUrl: '/sys/user/save',
      deleteUrl: '/sys/user/delete',
      formItemList: [
        {
          label: '登录名',
          type: 'input',
          prop: 'loginName',
          placeholder: '请输入登录名',
          value: null
        },
        {
          label: '用户名',
          type: 'input',
          prop: 'name',
          placeholder: '请输入用户名',
          value: null
        },
        {
          label: '手机',
          type: 'input',
          prop: 'phone',
          placeholder: '请输入手机号',
          value: null
        },
        {
          label: '邮箱',
          type: 'input',
          prop: 'email',
          placeholder: '请输入邮箱',
          value: null
        },
        {
          label: '是否启用',
          type: 'switch',
          prop: 'loginFlag',
          value: null
        }
      ],
      formData: {
        id: '',
        loginName: '',
        name: '',
        phone: '',
        email: '',
        loginFlag: 1
      },
      rules: {
        loginName: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        phone: [
          { required: false, trigger: 'blur', validator: valiPhone }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      // 配置弹窗
      roleList: [],
      configDialog: false,
      configLoading: true,
      selectKeys: [],
      selectKeysTemp: []
    }
  },
  created() {
    this.formDataTemp = this._.cloneDeep(this.formData)
    this.getList()
  },
  methods: {
    getList() {
      getUserList().then(res => {
        this.list = res.data.data.list
        this.listLoading = false
      })
    },
    configRole(row) {
      this.configDialog = true
      this.configLoading = true
      getRoleList().then(res => {
        this.configLoading = false
        this.roleList = res.data.list
        this.setCheckedKeys(row)
      })
    },
    configChange(row) {
      this.selectKeysTemp = []
      row.map(item => {
        this.selectKeysTemp.push(item.id)
      })
    },
    configSubmit() {},
    setCheckedKeys(row) {
      // 判断新增还是修改
      if (row || row === 0) {
        const tmp = [[1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]]
        this.selectKeys = tmp[row % tmp.length]
      } else {
        this.selectKeys = []
      }

      if (this.selectKeys.length > 0) {
        this.roleList.forEach(item => {
          if (this.selectKeys.includes(item.id)) {
            this.$nextTick(() => this.$refs.multipleTable.toggleRowSelection(item))
          }
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';
</style>
