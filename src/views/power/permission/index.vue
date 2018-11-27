<template>
  <div class="app-container permission-container">
    <div class="plan">
      <el-button type="primary" icon="el-icon-search" @click="addForm=!addForm">新增规则</el-button>
    </div>
    <tree-table :data="permissionList" :set="set" :columns="columns" border class="permission-tree" />

    <el-dialog :visible.sync="addForm" title="新增规则">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="规则名" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="规则名" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="规则编码" prop="coding">
          <el-input v-model="ruleForm.coding" />
        </el-form-item>
        <el-form-item label="控制器" prop="controller" required>
          <el-input v-model="ruleForm.controller" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="ruleForm.icon" />
        </el-form-item>
        <el-form-item label="菜单" prop="menu">
          <el-switch v-model="ruleForm.menu" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="ruleForm.sort" />
        </el-form-item>
        <el-form-item label="所属权限" prop="parentMenu">
          <el-select v-model="ruleForm.parentMenu" clearable placeholder="请选择">
            <el-option
              v-for="item in parentMenuList"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="资源类型" prop="type">
          <el-radio v-model="ruleForm.type" label="1">菜单</el-radio>
          <el-radio v-model="ruleForm.type" label="2">按钮</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import { mapGetters } from 'vuex'

export default {
  name: 'Permission',
  components: {
    treeTable
  },
  data() {
    return {
      addForm: false,
      columns: [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: '权限名称',
          value: 'title'
        },
        {
          text: '权限编码',
          value: 'coding'
        },
        {
          text: '控制器',
          value: 'controller'
        },
        {
          width: 50,
          text: '图标',
          value: 'icon'
        },
        {
          text: '菜单显示',
          value: 'menu'
        },
        {
          text: '排序',
          value: 'sort'
        },
        {
          text: '所属权限',
          value: 'parentMenu'
        },
        {
          text: '资源类型',
          value: 'type'
        }
      ],
      set: {
        edit: true,
        delete: true
      },
      ruleForm: {
        title: '',
        coding: '',
        icon: '',
        controller: '',
        menu: false,
        sort: '',
        parentMenu: '',
        type: '1'
      },
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        coding: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        icon: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        controller: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        menu: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        parentMenu: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'permissionList'
    ]),
    parentMenuList() {
      return [
        { label: 'a', value: 1 },
        { label: 'b', value: 2 }
      ]
    }
  },
  created() {
    this.getPermission()
  },
  methods: {
    getPermission() {
      this.$store.dispatch('GetPermission').then()
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/var';

.permission-tree {
  margin-top: $marginTopMedium;
}
</style>
