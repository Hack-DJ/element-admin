<template>
  <div v-loading="pageLoading" class="app-container">
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

          <!--:data="treeList"-->
          <el-tree
            ref="tree"
            :expand-on-click-node="false"
            :props="propsFormat"
            :load="loadTree"
            :filter-node-method="filterNode"
            lazy
            highlight-current
            node-key="id"
            @node-click="treeClick" />
        </div>
      </el-col>
      <el-col :span="19" :offset="1">
        <el-row :gutter="10" style="width: 100%;">
          <template v-if="pageConfig.isDetails&&pageConfig.isList">
            <el-tabs v-model="tabActive" @tab-click="tab=>tabActive=tab.name">
              <el-tab-pane label="列表" name="list">
                <page-list :format-form-data="listConfig" style="padding-top: 5px;" />
              </el-tab-pane>
              <el-tab-pane label="详情" name="details">
                <form-plan :form-data="ruleForm" :rules="rules" :item-list="itemList" />
              </el-tab-pane>
            </el-tabs>
          </template>
          <template v-else-if="pageConfig.isDetails">
            <form-plan :form-data="ruleForm" :rules="rules" :item-list="itemList" style="padding-top: 0;" />
          </template>
          <template v-else>
            <page-list :format-form-data="listConfig" style="padding-top: 0;" />
          </template>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { databaseForm, tableForm, fieldForm } from '@/api/storeData'
import { getList } from '@/api/base'
import { scrollTo } from '@/utils/scrollTo'
import { getStoreTree } from '@/api/storeData'
import treeToArray from '@/utils/dj-tree-eval'
import FormPlan from '@/components/Table/FormPlan'
import quickBtn from '@/components/Table/FormPlan/components/btn'
import PageList from './components/list'

export default {
  name: 'StoreDataIndex',
  components: {
    FormPlan,
    PageList,
    quickBtn
  },
  data() {
    const database = databaseForm()
    const table = tableForm()
    const field = fieldForm()
    const formData = { database: databaseForm(), table: tableForm(), field: fieldForm() }
    return {
      pageBaseConfig: {
        // 0: {
        //   isDetails: false,
        //   formConfig: {},
        //   isList: true,
        //   treeUrl: '/ips/a/ips/database/list',
        //   listConfig: database
        // },
        1: {
          isDetails: true,
          formConfig: database,
          isList: true,
          treeUrl: '/ips/a/ips/database/list',
          listConfig: table
        },
        2: {
          isDetails: true,
          formConfig: table,
          isList: true,
          listConfig: field
        },
        3: {
          isDetails: true,
          formConfig: field,
          isList: false,
          listConfig: {}
        }
      },
      pageLoading: true,
      propsFormat: {
        label: 'name',
        children: 'children'
      },
      filterText: '',
      list: [],
      activeItem: {},
      formData: formData,
      tabActive: 'list'
    }
  },
  computed: {
    // 格式化树节点
    treeList: function() {
      let tmp
      const list = this.list
      if (!Array.isArray(list)) {
        tmp = [list]
      } else {
        tmp = list
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, false], this.evalArgs) : [tmp, false]
      return func.apply(null, args)
    },
    // 页面渲染条件
    pageConfig: function() {
      return this.activeItem ? this.pageBaseConfig[this.activeItem._level] || {} : {}
    },
    // 选中节点List组件参数
    listConfig: function() {
      let listConfig = {}
      if (this.activeItem && this.pageBaseConfig[this.activeItem._level] !== undefined) {
        listConfig = {
          id: this.activeItem.id,
          parentData: this.activeItem,
          config: this.pageBaseConfig[this.activeItem._level].listConfig
        }
      }
      return listConfig
    },
    // 选中节点页面参数
    formatFormData: function() {
      return this.activeItem ? this.pageBaseConfig[this.activeItem._level] !== undefined ? this.pageBaseConfig[this.activeItem._level].formConfig : {} : {}
    },
    // 新增，修改面板控件列表
    itemList: function() {
      return this.formatFormData.itemList || []
    },
    // 新增修改面板数据对象
    ruleForm: function() {
      return this.formatFormData.ruleForm || {}
    },
    // 新增修改控件验证
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
    this.getTree()
  },
  methods: {
    // 加载树节点
    loadTree(node, resolve) {
      const pageConfig = this.pageBaseConfig[node.level]
      if (node.level === 0) {
        return resolve([
          {
            id: '-1',
            name: '数据库管理',
            pageConfig: pageConfig
          }
        ])
      } else {
        // 读取树列表
        getList(pageConfig.treeUrl).then(res => {
          const list = res.data.data.list
          resolve(list)
        })
      }
    },
    // 树筛选
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 获取树列表
    getTree() {
      // 加载第一层
      getStoreTree().then(res => {
        this.pageLoading = false
        const startTree = {
          id: '-1',
          name: '存储管理',
          parentId: 'allList',
          parentIds: ''
        }
        this.list = [startTree, ...res.data.list]
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(-1)
          this.activeItem = this.$refs.tree.getCurrentNode()
        })
      })
    },
    // 选择树节点
    treeClick(item) {
      // 存储选中值
      this.activeItem = item
      scrollTo(0, 800, '.app-main')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';

.app-container {
  .el-row {
    width: 100%;
    .btn-list {
      .el-dropdown {
        /deep/ .el-button span {
          display: block;
          height: 13px;
        }
      }
    }
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
