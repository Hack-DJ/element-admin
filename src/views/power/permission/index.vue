<template>
  <div class="app-container permission-container">
    <div class="plan">
      <el-button type="primary" icon="el-icon-search" @click="addForm">新增规则</el-button>
      <div class="table-cloumns">
        <el-checkbox-group v-model="optionSelect">
          <el-checkbox-button v-for="item in optionList" :label="item" :key="item.value">{{ item.text }}</el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>
    <tree-table :data="permissionList" :list-loading="listLoading" :set="set" :columns="cloumnsList" border class="permission-tree" @edit="editForm" />
    <el-dialog :visible.sync="formShow" :title="formTitle">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类型" prop="type">
          <el-radio v-model="ruleForm.type" label="1">菜单</el-radio>
          <el-radio v-model="ruleForm.type" label="2">按钮</el-radio>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentid">
          <el-select v-model="ruleForm.parentid" placeholder="空为顶级菜单">
            <el-option
              v-for="item in parentMenuList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="路径" prop="href">
          <el-input v-model="ruleForm.href" />
        </el-form-item>
        <el-form-item label="目标" prop="target">
          <el-input v-model="ruleForm.target" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="ruleForm.icon" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="ruleForm.sort" />
        </el-form-item>
        <el-form-item label="可见" prop="isShow">
          <el-switch :value="switchShow" @input="switchInput(ruleForm.isShow,$event)" />
        </el-form-item>
        <el-form-item label="权限标识" prop="permission">
          <el-input v-model="ruleForm.permission" />
        </el-form-item>
        <el-form-item label="备注" prop="remarks" required>
          <el-input v-model="ruleForm.remarks" />
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
      listLoading: true,
      isEdit: false,
      formShow: false,
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
          text: '排序',
          value: 'sort',
          width: 75
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
          text: '目标',
          value: 'target',
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
        parentid: '',
        name: '',
        href: '',
        target: '',
        icon: '',
        sort: '',
        isShow: true,
        permission: '',
        controller: '',
        remarks: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入规则名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        coding: [
          { required: true, message: '请输入规则编码', trigger: 'change' }
        ],
        icon: [
          { required: false, message: '请选择菜单图标', trigger: 'change' }
        ],
        controller: [
          { required: true, message: '请输入控制器', trigger: 'change' }
        ],
        sort: [
          { type: 'number', message: '请输入正确排序号,必须为数字', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'permissionList'
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
    parentMenuList() {
      return [
        { label: 'a', value: 1 },
        { label: 'b', value: 2 }
      ]
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
      this.formShow = true
      this.$nextTick(() => {
        this.resetForm('ruleForm')
      })
    },
    editForm(data) {
      this.ruleForm = data
      this.isEdit = true
      this.formShow = true
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

.table-cloumns {
  display: inline-block;
  vertical-align: middle;
}

.permission-tree {
  margin-top: $marginTopMedium;
}

</style>
