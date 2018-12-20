<template>
  <div class="app-container">
    <el-steps :active="stepActive">
      <el-step v-for="(item,index) in stepList" :title="item.title" :key="index">
        <svg-icon slot="icon" :icon-class="item.icon" />
      </el-step>
    </el-steps>
    <div class="quick">
      <div v-if="stemActiveItem.id==='database'" class="step">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item v-for="item in itemList" :label="item.label" :prop="item.prop" :key="item.prop">
            <template v-if="item.type==='radio'">
              <el-radio v-for="option in item.optionList" v-model="ruleForm[item.prop]" :label="option.value" :key="option.value">{{ option.label }}</el-radio>
            </template>
            <template v-if="item.type==='parent'">
              <el-input :value="ruleForm[item.prop]" :placeholder="item | placeholder" clearable readonly>
                <el-button v-if="item.inputType==='list'" slot="append" icon="el-icon-search" @click="parentShow(item,'list')" />
                <el-button v-else slot="append" icon="el-icon-search" @click="parentShow(item.prop,'menu')" />
              </el-input>
            </template>
            <template v-if="item.type==='icon'">
              <el-input v-model="ruleForm[item.prop]" clearable readonly>
                <svg-icon slot="prepend" :icon-class="ruleForm[item.prop]" />
                <el-button slot="append" icon="el-icon-search" @click="iconDialog=true" />
              </el-input>
            </template>
            <template v-if="item.type==='switch'">
              <el-switch :value="switchShow(ruleForm[item.prop])" @input="switchInput(item.prop,$event)" />
            </template>
            <template v-if="item.type==='input'">
              <el-input v-model="ruleForm[item.prop]" :type="item | inputType" :placeholder="item | placeholder" />
            </template>
            <template v-if="item.type==='select'">
              <el-select v-model="ruleForm[item.prop]" :placeholder="item | placeholder" clearable>
                <el-option
                  v-for="option in item.optionList"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value" />
              </el-select>
            </template>
            <template v-if="item.type==='datetime'">
              <el-date-picker
                v-model="ruleForm[item.prop]"
                :placeholder="item | placeholder"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime" />
            </template>
          </el-form-item>
        </el-form>
        <quick-btn :start="isStepStart(stemActiveItem)" :end="isStepEnd(stemActiveItem)" @next="stepNext" @up="stepUp" @reset="reset" @save="save" />
      </div>
      <div v-else-if="stemActiveItem.id==='table'" class="step">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item v-for="item in itemList" :label="item.label" :prop="item.prop" :key="item.prop">
            <template v-if="item.type==='radio'">
              <el-radio v-for="option in item.optionList" v-model="ruleForm[item.prop]" :label="option.value" :key="option.value">{{ option.label }}</el-radio>
            </template>
            <template v-if="item.type==='parent'">
              <el-input :value="ruleForm[item.prop]" :placeholder="item | placeholder" clearable readonly>
                <el-button v-if="item.inputType==='list'" slot="append" icon="el-icon-search" @click="parentShow(item,'list')" />
                <el-button v-else slot="append" icon="el-icon-search" @click="parentShow(item.prop,'menu')" />
              </el-input>
            </template>
            <template v-if="item.type==='icon'">
              <el-input v-model="ruleForm[item.prop]" clearable readonly>
                <svg-icon slot="prepend" :icon-class="ruleForm[item.prop]" />
                <el-button slot="append" icon="el-icon-search" @click="iconDialog=true" />
              </el-input>
            </template>
            <template v-if="item.type==='switch'">
              <el-switch :value="switchShow(ruleForm[item.prop])" @input="switchInput(item.prop,$event)" />
            </template>
            <template v-if="item.type==='input'">
              <el-input v-model="ruleForm[item.prop]" :type="item | inputType" :placeholder="item | placeholder" />
            </template>
            <template v-if="item.type==='select'">
              <el-select v-model="ruleForm[item.prop]" :placeholder="item | placeholder" clearable>
                <el-option
                  v-for="option in item.optionList"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value" />
              </el-select>
            </template>
            <template v-if="item.type==='datetime'">
              <el-date-picker
                v-model="ruleForm[item.prop]"
                :placeholder="item | placeholder"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime" />
            </template>
          </el-form-item>
        </el-form>
        <quick-btn :start="isStepStart(stemActiveItem)" :end="isStepEnd(stemActiveItem)" @next="stepNext" @up="stepUp" @reset="reset" @save="save" />
      </div>
      <div v-else-if="stemActiveItem.id==='field'" class="step">
        <quick-btn :start="isStepStart(stemActiveItem)" :end="isStepEnd(stemActiveItem)" @next="stepNext" @up="stepUp" @reset="reset" @save="save" />
      </div>
    </div>
  </div>
</template>
Ò
<script>
// import { getLibrary } from '@/api/storeData'
import quickBtn from './components/btn'

export default {
  name: 'StoreDataQuick',
  filters: {
    placeholder(item) {
      let placeholder = item.placeholder
      if (!placeholder) {
        placeholder = item.type === 'select' ? '请选择' : '请输入内容'
      }
      return placeholder
    },
    inputType(item) {
      return item.inputType || 'text'
    }
  },
  components: {
    quickBtn
  },
  data() {
    return {
      stepActive: 0,
      stepList: [
        { title: '新建数据库', icon: 'database', id: 'database' },
        { title: '新建数据表', icon: 'databaseTable', id: 'table' },
        { title: '新建表字段', icon: 'databaseField', id: 'field' }
      ],
      // 表单弹窗
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
  },
  computed: {
    stemActiveItem() {
      return this.stepList[this.stepActive]
    }
  },
  created() {
    // const tmp = {}
    // this.itemList.forEach(item => {
    //   tmp[item.prop] = item.value || ''
    // })
    // Object.assign(this.ruleForm, tmp)
    // console.log(this.ruleForm)
    this.formDataTemp = this._.cloneDeep(this.ruleForm)
  },
  methods: {
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
      this.$refs.ruleForm.resetFields()
    },
    save() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.quick {
  padding: 20px 0;
}
</style>
