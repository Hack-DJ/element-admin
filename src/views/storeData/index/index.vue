<template>
  <div class="app-container">
    <el-row :gutter="10" class="top">
      <h1 class="title">存储管理</h1>
      <el-row>
        <p class="desc">管理存储数据库、表、存储字段</p>
        <div class="link">
          <el-button type="text" icon="el-icon-delete">清空选择</el-button>
          <el-button type="text" icon="el-icon-plus">新增数据库</el-button>
        </div>
      </el-row>
    </el-row>
    <el-row :gutter="10">
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
      <el-col :span="19" :offset="1">
        <el-row :gutter="10" style="width: 100%;">
          <transition v-if="showFormPlan" name="el-zoom-in-top">
            <form-plan ref="formPlan" :form-data="ruleForm" :rules="rules" :item-list="itemList" is-sync>
              <quick-btn slot="formBtn" style="text-align: right;" @add="add" @reset="reset" @save="save" />
            </form-plan>
          </transition>
          <transition-group v-else name="el-zoom-in-top">
            <el-card v-for="item in list" v-if="item._level === 1" :key="item.id" class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ item.name }}</span>
                <el-dropdown style="float: right; padding: 3px 0">
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown" class="card-menu">
                    <el-dropdown-item class="add">新增</el-dropdown-item>
                    <el-dropdown-item class="edit">修改</el-dropdown-item>
                    <el-dropdown-item class="delete">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{ '列表内容 ' + o }}
              </div>
            </el-card>
          </transition-group>
        </el-row>
        <!--<el-row :gutter="20" style="width: 100%;" />-->
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

.app-container {
  .el-row {
    width: 100%;
  }
  .top {
    .title {
      margin: 0;
      font-size: $fontSizeLarger;
      font-weight: 500;
      color: $fontColor;
    }
    .desc {
      font-size: $fontSizeSmall;
      line-height: 1.5;
      color: $describeColor;
    }
    .link {
      margin-bottom: $marginBottomMedium;
    }
  }
  .tree-search {
    margin-bottom: $marginBottomMedium;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .box-card {
    display: inline-block;
    margin: 0 5px 5px;
    width: 420px;
    .el-dropdown-link {
      color: $colorBlue;
    }
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

}
</style>
