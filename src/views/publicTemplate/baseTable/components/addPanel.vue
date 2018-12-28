<template>
  <el-dialog v-if="show" :visible="show" :title="formTitle" @close="formDialogHide">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item v-for="item in itemList" :label="item.label" :prop="item.prop" :key="item.prop">
        <template v-if="item.type==='radio'">
          <el-radio v-for="option in item.optionList" v-model="ruleForm[item.prop]" :label="option.value" :key="option.value">{{ option.label }}</el-radio>
        </template>
        <template v-if="item.type==='switch'">
          <el-switch :value="switchShow(ruleForm[item.prop])" @input="switchInput(item.prop,$event)" />
        </template>
        <template v-if="item.type==='input'">
          <el-input v-model="ruleForm[item.prop]" :type="item | inputType" :placeholder="item | placeholder" :disabled="item.disabled" />
        </template>
        <template v-if="item.type==='autocomplete'">
          <el-autocomplete
            v-model="ruleForm[item.prop]"
            :fetch-suggestions="((queryString,cb)=>querySearch(queryString,cb,item))"
            :placeholder="item | placeholder"
            :disabled="item.disabled" />
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
      <el-form-item>
        <el-button type="primary" @click="submitForm">保存</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'AddPanel',
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
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    },
    formTitle: {
      type: String,
      default: '添加'
    },
    formData: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    },
    itemList: { type: Array, default: () => [] }
  },
  data() {
    return {
      ruleForm: this.formData
    }
  },
  computed: {
    ...mapGetters([
      'addFormLoading'
    ])
  },
  watch: {
    show(val) {
      !val && this.$store.dispatch('hideAddFormLoading')
    }
  },
  methods: {
    // 添加弹窗隐藏
    formDialogHide() {
      this.$emit('update:show', false)
    },

    // 输入自动提示
    querySearch(queryString, cb, item) {
      const tmp = []
      item.optionList.map(item => {
        if (!queryString) {
          return tmp.push({ value: item })
        }
        if (item.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
          tmp.push({ value: item })
        }
      })
      cb(tmp)
    },

    // switch按钮
    switchShow(value) {
      return !!parseInt(value)
    },
    switchInput(prop, val) {
      this.$set(this.ruleForm, prop, val ? 1 : 0)
    },

    // 提交
    submitForm() {
      return new Promise(resolve => {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            resolve(this.ruleForm)
          }
        })
      })
    },
    // 重置
    resetForm(data) {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>
