<template>
  <div class="app-container permission-container">
    <operation-panel :option-list="optionList" :option-select.sync="optionSelect" add-name="新增菜单" @addForm="addForm" />
    <tree-table :data="permissionList" :list-loading="listLoading" :set="set" :columns="cloumnsList" border class="permission-tree" @edit="editForm" />
    <dialog-icon :show.sync="iconDialog" :icon.sync="ruleForm.icon" />
    <el-dialog :visible.sync="formDialog" :title="formTitle">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类型" prop="type">
          <el-radio v-model="ruleForm.type" label="1">菜单</el-radio>
          <el-radio v-model="ruleForm.type" label="2">按钮</el-radio>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-input v-model="permissionIdToName" clearable readonly placeholder="空为一级菜单">
            <!--<el-input :value="ruleForm.parentName " clearable readonly placeholder="空为一级菜单">-->
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
import { DialogIcon } from '@/components/Dialog'

import OperationPanel from '@/components/Table/OperationPanel'
import { mapGetters } from 'vuex'

export default {
  name: 'Permission',
  components: {
    treeTable,
    OperationPanel,
    DialogIcon
  },
  data() {
    return {
      // icon弹窗
      iconDialog: false,
      // 菜单父级树弹窗
      parentDialog: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      parentTempData: {},
      // 添加弹窗
      isEdit: false,
      formDialog: false,
      ruleForm: {
        id: '',
        type: '1',
        parentId: '',
        parentName: '',
        name: '',
        href: '',
        icon: '',
        sort: 500,
        isShow: 1,
        permission: '',
        remarks: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        sort: [
          { required: false, type: 'number', message: '请输入数字值', trigger: 'blur' }
        ]
      },

      // table列表
      listLoading: true,
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
      set: {
        edit: true,
        delete: true
      },
      // table 可选择展示栏
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
      optionSelect: []
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
      return tmp ? tmp.name : ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      this.$store.dispatch('GetPermission').then(() => {
        this.listLoading = false
      })
    },

    // 新增弹窗
    addForm() {
      this.isEdit = false
      this.formDialog = true
      // 执行一次表单清空操作
      this.$nextTick(() => {
        this.resetForm('ruleForm')
      })
    },
    editForm(data) {
      this.ruleForm = data
      this.isEdit = true
      this.formDialog = true
    },
    switchInput(val) {
      this.ruleForm.isShow = val ? 1 : 0
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 格式化存储数据
          const parent = {
            'parent.id': this.ruleForm.parentId,
            'parent.name': this.ruleForm.parentName
          }
          this.$store.dispatch('SavePermission', Object.assign(this.ruleForm, parent)).then(res => {
            console.log(res)
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 父树弹窗
    parentMenuClick(data) {
      this.parentTempData = data
    },
    parentMenuConfirm() {
      this.parentDialog = false
      this.ruleForm.parentId = this.parentTempData.id
      this.ruleForm.parentName = this.parentTempData.name
    },
    parentMenuClear() {
      this.ruleForm.parentId = null
      this.parentTempData = {}
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
</style>
