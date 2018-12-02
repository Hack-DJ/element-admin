<template>
  <div class="app-container permission-container">
    <operation-panel :option-list="optionList" add-name="新增菜单" @addForm="addForm" @checkChange="checkChange" />
    <tree-table :data="permissionList" :list-loading="listLoading" :set="set" :columns="cloumnsList" border class="permission-tree" @edit="editForm" />
    <el-dialog :visible.sync="formDialog" :title="formTitle">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类型" prop="type">
          <el-radio v-model="ruleForm.type" label="1">菜单</el-radio>
          <el-radio v-model="ruleForm.type" label="2">按钮</el-radio>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-input v-model="permissionIdToName" clearable readonly placeholder="空为一级菜单">
            <el-button slot="append" icon="el-icon-search" @click="parentDialog=true" />
          </el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="菜单名" />
        </el-form-item>
        <el-collapse-transition>
          <div v-show="ruleForm.type==='1'">
            <el-form-item label="路径" prop="href">
              <el-input v-model="ruleForm.href" placeholder="页面路径" />
            </el-form-item>
            <el-form-item label="图标" prop="icon">
              <el-input v-model="ruleForm.icon" clearable readonly>
                <svg-icon slot="prepend" :icon-class="ruleForm.icon" />
                <el-button slot="append" icon="el-icon-search" @click="iconDialog=true" />
              </el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model.number="ruleForm.sort" placeholder="排序由小到大" />
            </el-form-item>
          </div>
        </el-collapse-transition>
        <el-form-item label="可见" prop="isShow">
          <el-switch :value="switchShow" @input="switchInput($event)" />
        </el-form-item>
        <el-form-item label="权限标识" prop="permission">
          <el-input v-model="ruleForm.permission" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="ruleForm.remarks" type="textarea" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="iconDialog" title="请选择图标">
      <div class="icons-wrapper">
        <div v-for="item of iconsMap" :key="item" class="icon-item" @click="iconClick(item)">
          <svg-icon :icon-class="item" class-name="disabled" />
          <span>{{ item }}</span>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="parentDialog" title="请选中上级菜单">
      <el-tree
        ref="tree2"
        :data="generationTree"
        :props="defaultProps"
        class="filter-tree"
        @node-click="parentMenuClick"
      />
      <div class="dialog-foot-button-group">
        <el-button type="primary" @click="parentMenuConfirm">确定</el-button>
        <el-button @click="parentMenuClear">设置为一级菜单</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import OperationPanel from '@/components/Table/OperationPanel'
import icons from '../requireIcons'
import { mapGetters } from 'vuex'

export default {
  name: 'Permission',
  components: {
    treeTable,
    OperationPanel
  },
  data() {
    return {
      iconsMap: icons,
      iconDialog: false,
      parentDialog: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      parentTempData: {},
      filterText: '',
      listLoading: true,
      isEdit: false,
      formDialog: false,
      columns: [
        {
          text: '名称',
          value: 'name'
        },
        {
          text: '路径',
          value: 'href'
        },
        {
          width: 50,
          text: '图标',
          value: 'icon'
        },
        {
          text: '可见',
          switch: true,
          width: 60,
          value: 'isShow'
        },
        {
          text: '类型',
          width: 55,
          value: 'type'
        }
      ],
      optionList: [
        {
          text: '排序',
          value: 'sort',
          width: 75
        },
        {
          text: '备注',
          value: 'remarks'
        },
        {
          text: '权限标识',
          value: 'permission'
        }
      ],
      optionSelect: [],
      set: {
        edit: true,
        delete: true
      },
      ruleForm: {
        type: '1',
        parentId: '',
        name: '',
        href: '',
        icon: '',
        sort: null,
        isShow: 1,
        permission: '',
        controller: '',
        remarks: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sort: [
          { required: false, type: 'number', message: '请输入数字值', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'permissionList',
      'permissionIdKey',
      'generationTree'
    ]),
    cloumnsList() {
      return this.columns.concat(this.optionSelect)
    },
    switchShow() {
      return !!parseInt(this.ruleForm.isShow)
    },
    formTitle() {
      return `${this.isEdit ? '修改' : '新增'}菜单`
    },
    permissionIdToName() {
      const tmp = this.permissionIdKey[this.ruleForm.parentId]
      return tmp ? this.permissionIdKey[this.ruleForm.parentId].name : ''
    }
  },
  mounted() {
    this.getPermission()
  },
  methods: {
    switchInput(val) {
      this.ruleForm.isShow = val ? 1 : 0
    },
    getPermission() {
      this.listLoading = true
      this.$store.dispatch('GetPermission').then(() => {
        this.listLoading = false
      })
    },
    addForm() {
      this.isEdit = false
      this.formDialog = true
      this.$nextTick(() => {
        this.resetForm('ruleForm')
      })
    },
    editForm(data) {
      this.ruleForm = data
      this.isEdit = true
      this.formDialog = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    iconClick(text) {
      this.iconDialog = false
      this.ruleForm.icon = text
    },
    parentMenuClick(data) {
      this.parentTempData = data
    },
    parentMenuConfirm() {
      this.parentDialog = false
      this.ruleForm.parentId = this.parentTempData.id
    },
    parentMenuClear() {
      this.ruleForm.parentId = null
      this.parentTempData = {}
    },
    checkChange(select) {
      this.optionSelect = select
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/var';

.plan {
  margin-bottom: $marginBottomMedium;
  .table-cloumns {
    display: inline-block;
    vertical-align: middle;
    @media screen and (max-width: 397px) {
      margin-top: 10px;
    }
  }
}

.icons-wrapper {
  margin: 0 auto;
}

.icon-item {
  display: inline-block;
  margin: 20px;
  height: 80px;
  text-align: center;
  min-width: 50px;
  width: 15%;
  font-size: 30px;
  color: #24292e;
  cursor: pointer;
}

span {
  display: block;
  font-size: 24px;
  margin-top: 10px;
}

.disabled {
  pointer-events: none;
}

</style>
