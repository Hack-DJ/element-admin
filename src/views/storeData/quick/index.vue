<template>
  <div class="app-container">
    <el-steps :active="stepActive">
      <el-step v-for="(item,index) in stepList" :title="item.title" :key="index">
        <svg-icon slot="icon" :icon-class="item.icon" />
      </el-step>
    </el-steps>
    <div class="quick">
      <transition name="el-fade-in-linear" mode="out-in">
        <div v-for="item in stepList" v-if="stemActiveItem.id===item.id" :key="item.id">
          <form-plan ref="formPlan" :form-data.sync="item.ruleForm" :rules="item.rules" :item-list="item.itemList" is-sync>
            <quick-btn slot="formBtn" :start="isStepStart(stemActiveItem)" :end="isStepEnd(stemActiveItem)" @next="stepNext" @up="stepUp" @reset="reset" @save="save" />
          </form-plan>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import FormPlan from '@/components/Table/FormPlan'
import quickBtn from './components/btn'

export default {
  name: 'StoreDataQuick',
  components: {
    quickBtn,
    FormPlan
  },
  data() {
    return {
      stepActive: 0,
      stepList: [
        {
          title: '新建数据库',
          icon: 'database',
          id: 'database',
          itemList: [
            {
              label: '数据库名',
              type: 'input',
              placeholder: '请输入数据库名',
              prop: 'database_name'
            },
            {
              label: '数据库地址',
              type: 'input',
              placeholder: '请输入数据库URL或IP地址',
              prop: 'database_url'
            },
            {
              label: '端口',
              type: 'input',
              placeholder: '请输入数据库端口',
              prop: 'database_port'
            },
            {
              label: '用户名',
              type: 'input',
              placeholder: '请输入数据库登录用户名',
              prop: 'login_user'
            },
            {
              label: '密码',
              type: 'input',
              placeholder: '请输入数据库登录密码',
              prop: 'login_psw'
            },
            {
              label: '备注',
              type: 'input',
              inputType: 'textarea',
              placeholder: '请输入数据库备注',
              prop: 'remarks'
            }
          ],
          ruleForm: {
            database_name: '',
            database_port: '',
            database_url: '',
            id: '',
            login_psw: '',
            login_user: '',
            remarks: ''
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
        },
        {
          title: '新建数据表',
          icon: 'databaseTable',
          id: 'table',
          itemList: [
            {
              label: '数据库名',
              type: 'input',
              placeholder: '请输入数据库名',
              prop: 'database_name'
            },
            {
              label: '数据库地址',
              type: 'input',
              placeholder: '请输入数据库URL或IP地址',
              prop: 'database_url'
            },
            {
              label: '端口',
              type: 'input',
              placeholder: '请输入数据库端口',
              prop: 'database_port'
            },
            {
              label: '用户名',
              type: 'input',
              placeholder: '请输入数据库登录用户名',
              prop: 'login_user'
            },
            {
              label: '密码',
              type: 'input',
              placeholder: '请输入数据库登录密码',
              prop: 'login_psw'
            },
            {
              label: '备注',
              type: 'input',
              inputType: 'textarea',
              placeholder: '请输入数据库备注',
              prop: 'remarks'
            }
          ],
          ruleForm: {
            database_name: '',
            database_port: '',
            database_url: '',
            id: '',
            login_psw: '',
            login_user: '',
            remarks: ''
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
        },
        {
          title: '新建表字段',
          icon: 'databaseField',
          id: 'field',
          itemList: [
            {
              label: '数据库名',
              type: 'input',
              placeholder: '请输入数据库名',
              prop: 'database_name'
            },
            {
              label: '数据库地址',
              type: 'input',
              placeholder: '请输入数据库URL或IP地址',
              prop: 'database_url'
            },
            {
              label: '端口',
              type: 'input',
              placeholder: '请输入数据库端口',
              prop: 'database_port'
            },
            {
              label: '用户名',
              type: 'input',
              placeholder: '请输入数据库登录用户名',
              prop: 'login_user'
            },
            {
              label: '密码',
              type: 'input',
              placeholder: '请输入数据库登录密码',
              prop: 'login_psw'
            },
            {
              label: '备注',
              type: 'input',
              inputType: 'textarea',
              placeholder: '请输入数据库备注',
              prop: 'remarks'
            }
          ],
          ruleForm: {
            database_name: '',
            database_port: '',
            database_url: '',
            id: '',
            login_psw: '',
            login_user: '',
            remarks: ''
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
      ]
    }
  },
  computed: {
    stemActiveItem() {
      return this.stepList[this.stepActive]
    }
  },
  created() {
    this.stepList.map(item => {
      item.ruleFormTemp = this._.cloneDeep(item.ruleForm)
    })
  },
  methods: {
    getFormPlan() {
      return this.$refs.formPlan[0]
    },
    isStepStart(item) {
      return Object.is([...this.stepList].shift(), item)
    },
    isStepEnd(item) {
      return Object.is([...this.stepList].pop(), item)
    },
    stepNext() {
      if (this.stepActive < this.stepList.length) this.stepActive++
    },
    stepUp() {
      if (this.stepActive > 0) this.stepActive--
    },
    reset() {
      const formPlan = this.getFormPlan()
      formPlan.resetForm(this.stemActiveItem.ruleFormTemp)
    },
    save() {
      const formPlan = this.getFormPlan()
      formPlan.submitForm().then(data => {
        console.log(data)
        this.stepNext()
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
