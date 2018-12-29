<template>
  <div class="app-container">
    <table-list
      :list="list"
      :columns="columns"
      :list-loading="listLoading"
      :columns-replace="columnsReplace"
      power-config
      add-name="新增角色"
      @addForm="addForm"
      @switchToggle="switchToggle"
      @config="editConfigRole"
      @edit="editForm"
      @delete="confirmDelete" />
    <add-form
      ref="addForm"
      :item-list="formItemList"
      :rules="rules"
      :form-data="formData"
      :form-title="formTitle"
      :show.sync="addDialog"
      config-name="配置菜单"
      show-config
      @save="submitForm"
      @config="configRole" />
    <el-dialog :visible.sync="configDialog" title="配置菜单">
      <el-tree
        v-loading="configLoading"
        ref="tree"
        :data="generationTree"
        :props="defaultProps"
        :default-checked-keys="selectKeys"
        :default-expanded-keys="selectKeys"
        node-key="id"
        show-checkbox
        check-strictly
        render-after-expand
        class="filter-tree"
      />
      <div class="dialog-foot-button-group">
        <el-button @click="configDialog=false">取消</el-button>
        <el-button type="primary" @click="configSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { AddFormMixin } from '@/mixins'
import { mapGetters } from 'vuex'
import { getRoleList } from '@/api/power'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import { requestForm } from '@/api/addForm'

export default {
  name: 'Role',
  components: { AddForm, TableList },
  mixins: [AddFormMixin],
  data() {
    return {
      pageName: '角色',
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '角色名称',
          value: 'name'
        },
        {
          text: '英文名称',
          value: 'enname'
        },
        {
          text: '启用',
          value: 'useable',
          switchKey: 'useable',
          width: 60,
          switch: true
        },
        {
          text: '角色类型',
          value: 'roleType'
        },
        {
          text: '系统数据',
          value: 'sysData',
          switchKey: 'sysData',
          width: 70,
          switch: true
        },
        {
          text: '备注',
          value: 'remarks'
        }
      ],
      // 表单弹窗
      saveUrl: '/ips/a/sys/role/save',
      deleteUrl: '/ips/a/sys/role/delete',
      formData: {
        id: '',
        name: '',
        enname: '',
        useable: 1,
        roleType: '',
        sysData: 0,
        remarks: '',
        menuIds: []
      },
      rules: {
        title: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        roleType: [
          { required: true, message: '请选择角色类型', trigger: 'blur' }
        ]
      },
      // 配置弹窗
      configDialog: false,
      configLoading: true,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectKeys: []
    }
  },
  computed: {
    ...mapGetters([
      'generationTree',
      'roleType'
    ]),
    roleTypeOptionList() {
      const tmp = []
      Object.keys(this.roleType).map(key => {
        tmp.push({ label: this.roleType[key], value: key })
      })
      return tmp
    },
    formItemList() {
      return [
        {
          label: '角色名称',
          type: 'input',
          prop: 'name'
        },
        {
          label: '英文名',
          type: 'input',
          prop: 'enname'
        },
        {
          label: '是否启用',
          type: 'switch',
          prop: 'useable'
        },
        {
          label: '角色类型',
          type: 'select',
          prop: 'roleType',
          optionList: this.roleTypeOptionList
        },
        {
          label: '是否系统数据',
          type: 'switch',
          prop: 'sysData'
        },
        {
          label: '备注',
          type: 'input',
          inputType: 'textarea',
          prop: 'remarks'
        }
      ]
    },
    columnsReplace() {
      return {
        roleType: this.roleType
      }
    }
  },
  created() {
    this.formDataTemp = this._.cloneDeep(this.formData)
    this.getList()
  },
  methods: {
    getList() {
      getRoleList().then(res => {
        this.list = res.data.data.map(item => this._.pick(item, Object.keys(this.formData)))
        this.listLoading = false
      })
    },
    addForm() {
      this.formData = this._.cloneDeep(this.formDataTemp)
      this.selectKeys = []
      this.addDialogShow()
    },
    editForm(index) {
      this.formData = this.list[index]
      this.selectKeys = []
      this.addDialogShow()
    },
    editConfigRole(index) {
      // 根据row 获取当前选中记录，并获取当前选中记录角色权限
      this.formData = this.list[index]
      this.selectKeys = []
      this.configRole()
    },
    configRole() {
      this.configDialog = true
      // 判断是否已经加载过，加载过则不重复加载
      if (this.configLoading) {
        this.$store.dispatch('GetPermission').then(() => {
          this.configLoading = false
          this.setCheckedKeys()
        })
      } else {
        this.setCheckedKeys()
      }
    },
    configSubmit() {
      // 获取选中节点
      const selectKeysTmp = []
      this.$refs.tree.getCheckedNodes().map(item => {
        selectKeysTmp.push({ id: item.id })
      })
      // 判断是新增还是配置
      this.selectKeys = selectKeysTmp
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
      if (!this._.isEmpty(this.selectKeys)) data.menuIds = this.selectKeys
      // const json = { json: data }
      requestForm(this.saveUrl, data).then(res => {
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
      const selectKeyId = []
      if (this.selectKeys.length > 0) {
        this.selectKeys.map(item => selectKeyId.push(item.id))
      }
      this.$nextTick(() => {
        for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
          this.$refs.tree.store._getAllNodes()[i].expanded = selectKeyId.includes(parseInt(this.$refs.tree.store._getAllNodes()[i].data.id))
        }
        this.$refs.tree.setCheckedKeys(selectKeyId)
      })
    }
  }
}
</script>
