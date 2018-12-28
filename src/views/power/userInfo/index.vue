<template>
  <div class="app-container">
    <transition name="el-fade-in-linear" mode="out-in">
      <form-plan ref="formPlan" :form-data.sync="ruleForm" :rules="rules" :item-list="itemList" is-sync>
        <div slot="formBtn" style="text-align: center;">
          <el-button :loading="loading" type="primary" @click="save">保存</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </form-plan>
    </transition>
  </div>
</template>

<script>

import FormPlan from '@/components/Table/FormPlan'
import { validatePhone, validateEmpty } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { requestForm } from '@/api/addForm'

export default {
  name: 'StoreDataQuick',
  components: {
    FormPlan
  },
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
      // 表单弹窗
      saveUrl: '/ips/a/sys/user/save',
      deleteUrl: '/ips/a/sys/user/delete',
      itemList: [
        {
          label: '登录名',
          type: 'input',
          prop: 'loginName',
          disabled: true,
          placeholder: '请输入登录名',
          value: null
        },
        {
          label: '用户名',
          type: 'input',
          prop: 'name',
          disabled: true,
          placeholder: '请输入用户名',
          value: null
        },
        {
          label: '密码',
          type: 'input',
          inputType: 'password',
          placeholder: '为空则不修改密码',
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
        }
      ],
      ruleForm: {
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
        password: [
          { required: false, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码最小6位数', trigger: 'blur' },
          { pattern: /^(\w){6,20}$/, message: '只能输入6-20个字母、数字、下划线' }
        ],
        phone: [
          { required: false, trigger: 'blur', validator: valiPhone }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.ruleForm = this._.pick(this.userInfo, Object.keys(this.ruleForm))
  },
  methods: {
    reset() {
      this.$refs.formPlan.resetForm()
    },
    save() {
      this.$refs.formPlan.submitForm().then(data => {
        this.loading = true
        // 调用保存
        this.submitForm(data)
      })
    },
    // 提交表单
    submitForm(data) {
      // 格式化存储数据
      requestForm('/ips/a/sys/user/save', data).then(res => {
        console.log(res)
        this.$store.commit('SET_USERINFO', res)
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.quick {
  padding: 20px 0;
}
</style>
