<template>
  <div class="app-container">
    <operation-panel add-name="新增角色" @addForm="addForm" />
    <table-list :list="list" :columns="columns" :list-loading="listLoading" power-config @config="configRole" @edit="editForm" @delete="deleteForm" />
    <add-form
      :item-list="formItemList"
      :rules="rules"
      :form-data="formData"
      :form-title="formTitle"
      :show.sync="formDialog"
      config-name="配置菜单"
      show-config
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
import { mapGetters } from 'vuex'
import { getRoleList } from '@/api/power'
import OperationPanel from '@/components/Table/OperationPanel'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'

export default {
  name: 'Role',
  components: { OperationPanel, AddForm, TableList },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '角色名称',
          value: 'title'
        },
        {
          text: '英文名称',
          value: 'eTitle'
        },
        {
          text: '是否启用',
          value: 'state',
          width: 60,
          switch: true
        }
      ],
      // 表单弹窗
      isNew: true,
      formDialog: false,
      formItemList: [
        {
          label: '角色名称',
          type: 'input',
          prop: 'title',
          value: null
        },
        {
          label: '英文名',
          type: 'input',
          prop: 'eTitle',
          value: null
        },
        {
          label: '是否启用',
          type: 'switch',
          prop: 'state',
          value: null
        }
      ],
      formData: {
        id: null,
        title: null,
        eTitle: null,
        state: 1
      },
      formDataTemp: {},
      rules: {
        title: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
    ]),
    formTitle() {
      return `${this.isNew ? '新增' : '修改'}角色`
    }
  },
  created() {
    this.formDataTemp = this._.cloneDeep(this.formData)
    this.getList()
  },
  methods: {
    getList() {
      getRoleList().then(res => {
        this.list = res.data.list
        this.listLoading = false
      })
    },
    addForm() {
      this.isNew = true
      this.formData = this.formDataTemp
      this.formDialog = !this.formDialog
    },
    editForm(index) {
      this.isNew = false
      this.formData = this.list[index]
      this.formDialog = true
    },
    deleteForm(index) {
      this.list.splice(index, 1)
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
      for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        this.$refs.tree.store._getAllNodes()[i].expanded = this.selectKeys.includes(this.$refs.tree.store._getAllNodes()[i].data.id)
      }
      this.$refs.tree.setCheckedKeys(this.selectKeys)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';
</style>
