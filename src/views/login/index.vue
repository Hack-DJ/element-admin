<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">
      <img src="../../assets/md/logo.png" alt="logo" class="logo">{{ webTitle }}</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordIcon" />
        </span>
      </el-form-item>
      <transition name="el-zoom-in-top">
        <el-form-item v-if="verifyShow" prop="verificationcode" class="verify">
          <span class="svg-container">
            <svg-icon icon-class="verificationcode" />
          </span>
          <el-input v-model="loginForm.verificationcode" name="verificationcode" type="text" auto-complete="on" placeholder="验证码" />
          <div class="code">
            123123123
          </div>
        </el-form-item>
      </transition>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登 录
        </el-button>
      </el-form-item>
    </el-form>
    <div class="meta">
      <p v-for="item in footerList" :key="item" class="meta-item">{{ item }}</p>
    </div>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    const validateVerify = (rule, value, callback) => {
      if (!value || value.length !== 6) {
        callback(new Error('验证码错误'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin',
        verificationCode: null
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        verificationcode: [{ required: false, trigger: 'blur', validator: validateVerify }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      verifyShow: false
    }
  },
  computed: {
    ...mapGetters([
      'footerList',
      'webTitle'
    ]),
    passwordIcon() {
      return this.pwdType === 'password' ? 'eye' : 'eye-open'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/var';

.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 500px;
  background: $backGroundColor url('../../assets/md-bg.svg') no-repeat center;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $fontColor;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $fontVitalColor;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      .logo {
        margin: 0 20px 0 -40px;
        vertical-align: middle;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $fontColor;
      cursor: pointer;
      user-select: none;
    }
    .verify {
      .el-input {
        width: 70%;
      }
      .code {
        position: absolute;
        top: 7px;
        right: 10px;
        cursor: pointer;
        user-select: none;
        text-align: right;
      }
    }
  }
  .meta {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    padding: 0 40px;
    text-align: center;
    &-item {
      display: inline-block;
      margin: 0 10px;
      font-size: $fontSize;
      color: $fontColor;
    }
  }
}
</style>
