<template>
  <div class="app-container">
    <el-row :gutter="20" style="width: 100%;">
      <el-col :span="4">
        <div class="left-menu">
          <el-input
            v-model="filterText"
            class="tree-search"
            placeholder="输入关键字进行过滤" />
          <el-tree
            ref="tree"
            :props="propsFormat"
            :data="formatData"
            :filter-node-method="filterNode"
            highlight-current
            node-key="id"
            @node-click="treeClick" />
        </div>
      </el-col>
      <el-col :span="20">
        <transition v-if="showFormPlan" name="el-zoom-in-top">
          <el-row :gutter="20" style="width: 100%;">
            <form-plan ref="formPlan" :form-data="ruleForm" :rules="rules" :item-list="itemList" is-sync>
              <quick-btn slot="formBtn" style="text-align: right;" @add="add" @reset="reset" @save="save" />
            </form-plan>
          </el-row>
        </transition>
        <el-row :gutter="20" style="width: 100%;">2</el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { databaseForm } from '@/api/storeData'
import { scrollTo } from '@/utils/scrollTo'
import { getStoreTree } from '@/api/storeData'
import treeToArray from '@/utils/dj-tree-eval'
import FormPlan from '@/components/Table/FormPlan'
import quickBtn from '@/components/Table/FormPlan/components/btn'

export default {
  name: 'StoreDataIndex',
  components: {
    FormPlan,
    quickBtn
  },
  data() {
    const formData = { database: databaseForm() }
    return {
      formPlan: null,
      propsFormat: {
        label: 'name',
        children: 'children'
      },
      filterText: '',
      list: [],
      expandAll: false,
      activeItem: null,
      formData: formData,
      isNew: false,
      upSaveList: []
    }
  },
  computed: {
    // 格式化数据源
    showFormPlan: function() {
      return Object.keys(this.ruleForm).length > 0
    },
    formatData: function() {
      let tmp
      const list = this.list
      if (!Array.isArray(list)) {
        tmp = [list]
      } else {
        tmp = list
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    },
    activeTypeName: function() {
      let name = ''
      if (this.activeItem !== null) {
        const key = {
          1: 'database',
          2: 'table',
          3: 'field'
        }
        name = key[this.activeItem._level]
      }
      return name
    },
    formatFormData: function() {
      return this.formData[this.activeTypeName] || {}
    },
    itemList: function() {
      return this.formatFormData.itemList || []
    },
    ruleForm: function() {
      let data = {}
      if (Object.keys(this.formatFormData).length > 0) {
        data = this.formatFormData.ruleForm
        if (!this.isNew) {
          const tmp = {}
          Object.keys(data).map(key => {
            tmp[key] = this.activeItem[key]
          })
          Object.assign(data, tmp)
        }
      }

      return data
    },
    rules: function() {
      return this.formatFormData.rules || {}
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getFormPlan() {
      return this.$refs.formPlan
    },
    getList() {
      if (this.activeItem === null) {
        // 加载第一层
        getStoreTree().then(res => {
          this.list = [...res[0].data.list, ...res[1].data.list, ...res[2].data.list]
        })
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    treeClick(item) {
      // 存储选中值
      this.activeItem = item
      // 取消新增状态
      this.isNew = false
      // 清空提交列表
      this.upSaveList = []
      scrollTo(0, 800, '.app-main')
    },
    add() {
      const formPlan = this.getFormPlan()
      formPlan.submitForm().then(data => {
        this.isNew = true
        // 调用存储数据到提交列表,并不提交
        this.upSaveList.push(data)
      })
    },
    reset() {
      const formPlan = this.getFormPlan()
      formPlan.resetForm()
    },
    save() {
      // 提交缓存数据到服务器
      this.isNew = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';

.tree-search {
  margin-bottom: $marginBottomMedium;
}
</style>
