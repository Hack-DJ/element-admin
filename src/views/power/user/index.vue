<template>
  <div class="app-container">
    <table-list
      :list="list"
      :columns="columns"
      :list-loading="listLoading"
      power-config
      add-name="新增用户"
      @addForm="addForm"
      @config="editConfigRole"
      @switchToggle="switchToggle"
      @edit="editForm"
      @delete="confirmDelete" />
    <pagination v-show="count>0" :total="count" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
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
        v-loading="configLoading"
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
          <template slot-scope="scope">{{ rotypeFormat(scope.row.roleType) }}</template>
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
import { AddFormMixin, PaginationMixin } from '@/mixins'
import { validatePhone, validateEmpty } from '@/utils/validate'
import { getUserList, getRoleList } from '@/api/power'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import { requestForm } from '@/api/addForm'

export default {
  name: 'User',
  components: { AddForm, TableList, Pagination },
  mixins: [AddFormMixin, PaginationMixin],
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
      saveUrl: '/ips/a/ips/a/sys/user/save',
      deleteUrl: '/ips/a/sys/user/delete',
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
          label: '密码',
          type: 'input',
          inputType: 'password',
          prop: 'password'
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
        password: '',
        email: '',
        roleList: [],
        loginFlag: 1
      },
      rules: {
        loginName: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [],
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
      selectKeysTmp: [],
      selectKeys: []
    }
  },
  computed: {
    ...mapGetters([
      'roleType'
    ])
  },
  created() {
    this.formDataTemp = this._.cloneDeep(this.formData)
    this.getList()
  },
  methods: {
    getList() {
      getUserList().then(res => {
        const data = res.data.data
        this.list = data.list.map(item => this._.pick(item, Object.keys(this.formData)))
        this.count = data.count
        this.pageNo = data.count
        this.pageSize = data.count
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    addForm() {
      this.formData = this._.cloneDeep(this.formDataTemp)
      this.rules.password = [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码最小6位数', trigger: 'blur' },
        { pattern: /^(\w){6,20}$/, message: '只能输入6-20个字母、数字、下划线' }
      ]
      this.selectKeys = []
      this.addDialogShow()
    },
    editForm(index) {
      this.formData = this.list[index]
      this.rules.password = [
        { required: false, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码最小6位数', trigger: 'blur' },
        { pattern: /^(\w){6,20}$/, message: '只能输入6-20个字母、数字、下划线' }
      ]
      this.selectKeys = []
      this.addDialogShow()
    },
    rotypeFormat(key) {
      return this.roleType[key]
    },
    editConfigRole(index) {
      // 根据row 获取当前选中记录，并获取当前选中记录角色权限
      this.formData = this.list[index]
      this.selectKeys = []
      this.configRole()
    },
    configRole() {
      this.configDialog = true
      this.configLoading = true
      getRoleList().then(res => {
        this.configLoading = false
        this.roleList = res.data.data
        this.setCheckedKeys()
      }).catch(() => {
        this.configLoading = false
      })
    },
    configChange(row) {
      this.selectKeysTmp = []
      row.map(item => {
        this.selectKeysTmp.push({ id: item.id })
      })
    },
    configSubmit() {
      // 判断是新增用户还是配置
      this.selectKeys = this.selectKeysTmp
      if (this.addDialog) {
        this.configDialog = false
      } else {
        // 获取当前选中框值并提交
        this.submitForm(this.formData)
      }
    },
    // 提交表单
    submitForm(data) {
      // 格式化存储数据
      if (!this._.isEmpty(this.selectKeys)) data.roleList = this.selectKeys
      const json = { json: data }
      requestForm(this.saveUrl, json).then(res => {
        res = this._.pick(res.data.data, Object.keys(this.formData))
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
    setCheckedKeys() {
      if (this.selectKeys.length > 0) {
        const selectKeyId = []
        this.selectKeys.map(item => selectKeyId.push(item.id))
        this.roleList.forEach(item => {
          if (selectKeyId.includes(item.id)) {
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
