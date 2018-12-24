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

import { databaseForm, tableForm, fieldForm } from '@/api/storeData'
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
        databaseForm({
          title: '新建数据库',
          icon: 'database',
          id: 'database'
        }),
        tableForm({
          title: '新建数据表',
          icon: 'databaseTable',
          id: 'table'
        }),
        fieldForm({
          title: '新建表字段',
          icon: 'databaseField',
          id: 'field'
        })
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
        // 调用保存
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
