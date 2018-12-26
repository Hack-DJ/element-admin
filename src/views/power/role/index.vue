<template>
  <div class="app-container">
    <operation-panel add-name="新增角色" @addForm="addForm" />
    <table-list
      :list="list"
      :columns="columns"
      :list-loading="listLoading"
      :columns-replace="columnsReplace"
      power-config
      @config="configRole"
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
        <el-button type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { AddFormMixin } from '@/mixins'
import { mapGetters } from 'vuex'
import { getRoleList } from '@/api/power'
import OperationPanel from '@/components/Table/OperationPanel'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'

export default {
  name: 'Role',
  components: { OperationPanel, AddForm, TableList },
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
      columnsReplace: {
        roleType: {
          assignment: '任务分配',
          'security-role': '管理角色',
          user: '普通角色'
        }
      },
      // 表单弹窗
      saveUrl: '/sys/role/save',
      deleteUrl: '/sys/role/delete',
      formItemList: [
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
          optionList: [
            { label: '任务分配', value: 'assignment' },
            { label: '管理角色', value: 'security-role' },
            { label: '普通角色', value: 'user' }
          ]
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
      ],
      formData: {
        id: '',
        name: '',
        enname: '',
        useable: 1,
        roleType: '',
        sysData: 0,
        remarks: '',
        menuIds: ''
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
      'generationTree'
    ])
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
    configRole(row) {
      this.configDialog = true
      // 判断是否已经加载过，加载过则不重复加载
      if (this.configLoading) {
        this.$store.dispatch('GetPermission').then(() => {
          this.configLoading = false
          this.setCheckedKeys(row)
        })
      } else {
        this.setCheckedKeys(row)
      }
    },
    setCheckedKeys(row) {
      // 判断新增还是修改
      if (row) {
        const tmp = [[27, 56, 30], [28, 2, 59, 29], [62, 63, 2, 79]]
        this.selectKeys = tmp[row % tmp.length]
      } else {
        this.selectKeys = []
      }
      this.$nextTick(() => {
        for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
          this.$refs.tree.store._getAllNodes()[i].expanded = this.selectKeys.includes(parseInt(this.$refs.tree.store._getAllNodes()[i].data.id))
        }
        this.$refs.tree.setCheckedKeys(this.selectKeys)
      })
    }
  }
}
</script>
