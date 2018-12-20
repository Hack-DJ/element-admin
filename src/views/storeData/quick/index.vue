<template>
  <div class="app-container">
    <el-steps :active="stepActive">
      <el-step title="新建数据库">
        <svg-icon slot="icon" icon-class="database" />
      </el-step>
      <el-step title="新建数据表" icon="el-icon-upload">
        <svg-icon slot="icon" icon-class="databaseTable" />
      </el-step>
      <el-step title="新建表字段" icon="el-icon-picture">
        <svg-icon slot="icon" icon-class="databaseData" />
      </el-step>
    </el-steps>
    <div>
      <div v-if="stepActive===1" class="step">
        <el-button type="primary">下一步</el-button>
        <el-button>跳过</el-button>
      </div>
      <div v-else-if="stepActive===2" class="step">
        <el-button type="primary">上一步</el-button>
        <el-button type="primary">下一步</el-button>
        <el-button>跳过</el-button>
      </div>
      <div v-else class="step">
        <el-button type="primary">下一步</el-button>
        <el-button>提交</el-button>
      </div>
    </div>
  </div>
</template>
Ò
<script>
// import { getLibrary } from '@/api/storeData'

export default {
  name: 'StoreDataQuick',
  data() {
    return {
      stepActive: 1,
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
    Object.assign(this.formData, tmp)
    this.formDataTemp = this._.cloneDeep(this.formData)
  },
  methods: {}
}
</script>
