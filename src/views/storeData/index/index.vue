<template>
  <div class="app-container">
    <el-row :gutter="10" class="top">
      <h1 class="title">存储管理</h1>
      <el-row>
        <p class="desc">管理存储数据库、表、存储字段</p>
        <div class="link">
          <el-button type="text" icon="el-icon-plus" @click="addDatabase">新增数据库</el-button>
          <el-button type="text" icon="el-icon-upload" @click="save">保存</el-button>
        </div>
      </el-row>
    </el-row>
    <el-row :gutter="10">
      <el-col :lg="5" :sm="6" :xs="24" class="tree-list">
        <div class="left-menu">
          <el-input
            v-model="filterText"
            class="tree-search"
            placeholder="输入关键字进行过滤" />
          <el-tree
            ref="tree"
            :props="treeProps"
            :expand-on-click-node="false"
            :load="loadTree"
            :filter-node-method="filterNode"
            lazy
            highlight-current
            node-key="id"
            @node-click="treeClick">
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span class="custom-tree-title">{{ node.label }}</span>
              <span class="custom-tree-btn">
                <el-button
                  v-if="node.level===1"
                  type="text"
                  size="mini"
                  class="el-icon-plus"
                  @click.stop="() => append(node,data)" />
                <el-button
                  type="text"
                  size="mini"
                  class="el-icon-minus"
                  @click.stop="() => remove(node, data)" />
              </span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :lg="19" :sm="18" :xs="24" style="padding-left: 15px;padding-top: 0;">
        <template v-if="activeItem.baseUrl">
          <page-details v-if="level===1" ref="details" :active-item="activeItem" :parent-data="parentDetailsData" />
          <template v-if="level===2">
            <el-tabs v-model="tabActive" @tab-click="tab=>tabActive=tab.name">
              <el-tab-pane label="字段" name="list">
                <page-list ref="tabList" :active-item="activeItem" :parent-data="parentListData" style="padding-top: 5px;" @listError="listError" />
              </el-tab-pane>
              <el-tab-pane label="详情" name="details">
                <page-details ref="tabDetails" :active-item="activeItem" :parent-data="parentDetailsData" @detailError="detailError" />
              </el-tab-pane>
            </el-tabs>
          </template>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getList, requestForm } from '@/api/base'
import { scrollTo } from '@/utils/scrollTo'
import PageList from './components/list'
import PageDetails from './components/Details'
import QuickBtn from '@/components/Table/FormPlan/components/btn'

export default {
  name: 'StoreDataIndex',
  components: {
    PageDetails,
    QuickBtn,
    PageList
  },
  data() {
    return {
      topResolve: null,
      level: 0,
      treeProps: {
        isLeaf: 'leaf'
      },
      pageBaseConfig: {
        0: {
          // 数据库节点
          treeUrl: '/ips/a/ips/database/listAll'
        },
        1: {
          // 数据表节点
          treeUrl: '/ips/a/ips/database/getTableById',
          // 数据库基础URL
          baseUrl: '/ips/a/ips/database',
          // 数据库数据验证
          rules: {
            databaseName: [{ required: true, message: '请输入数据库名', trigger: 'blur' }]
          }
        },
        2: {
          // 数据表基础URL
          baseUrl: '/ips/a/ips/collectTable',
          // 数据表数据验证
          rules: {
            tableCode: [{ required: true, message: '请输入表名', trigger: 'blur' }]
          },
          // 数据表字段基础URL
          listBase: '/ips/a/ips/collectField',
          listRules: {
            databaseId: [{ required: true, message: '数据库不能为空', trigger: 'blur' }],
            tableCode: [{ required: true, message: '请输入表名', trigger: 'blur' }]
          }
        }
      },
      filterText: '',
      parentDetailsData: {},
      parentListData: {},
      activeNode: null,
      activeItem: {},
      tabActive: 'list'
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // 加载树节点
    loadTree(node, resolve) {
      if (this.topResolve === null) this.topResolve = resolve
      const pageConfig = this.pageBaseConfig[node.level]
      // 读取树列表
      let params = {}
      if (node.level === 1) {
        params = { id: node.data.id }
      }
      getList(pageConfig.treeUrl, params).then(res => {
        const data = res.data.data
        if (node.level === 1) {
          data.map(item => {
            item.leaf = true
          })
        }
        resolve(data)
      })
    },
    // 树筛选
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 选择树节点
    treeClick(item, node) {
      this.activeNode = node
      // 清空父级选项
      this.parentDetailsData = {}
      const level = node.level
      this.level = level
      // 基础URL 验证规则
      const { baseUrl, rules } = this.pageBaseConfig[level]
      // 存储选中值
      this.activeItem = Object.assign(item, { baseUrl, rules })

      if (this.level === 2) {
        console.log(node)
        this.parentDetailsData = node.parent.data
        this.activeItem.databaseId = node.parent.data.id
        this.fieldParent(item)
      }
      scrollTo(0, 800, '.app-main')
    },
    // 新增数据库
    addDatabase() {
      this.activeNode = null
      this.addNode(1)
    },
    // 新增数据表
    append(node, data) {
      this.activeNode = node
      // 选中当前点击节点
      this.$refs.tree.setCurrentKey(data.id)
      this.addNode(node.level + 1, data)
    },
    // 新增节点
    addNode(level = 1, parentData = {}) {
      this.parentDetailsData = parentData
      this.level = level
      const { baseUrl, rules } = this.pageBaseConfig[level]
      this.activeItem = {
        id: null,
        baseUrl,
        rules,
        getTime: new Date().getTime()
      }
      if (level === 2) {
        this.activeItem.databaseId = parentData.id
        this.fieldParent()
      }
    },
    // 字段列表父表节点
    fieldParent(parent = {}, level = 2) {
      this.parentListData = parent
      const { listBase, listRules } = this.pageBaseConfig[level]
      Object.assign(this.activeItem, { listBase, listRules })
    },
    // 更新节点
    updateNode(data) {
      const node = this.$refs.tree.getNode(data.id)
      if (node === null) {
        // 新增
        this.$refs.tree.append(data, this.activeNode)
      } else {
        // 修改
        node.data.label = data.label
      }
    },
    // 删除节点
    remove(node, item) {
      // this.$refs.tree.setCurrentKey(item.id)
      // 提示是否删除
      this.$confirm('此操作将永久删除选中记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { baseUrl } = this.pageBaseConfig[node.level]
        requestForm(baseUrl + '/delete', { json: [item.id] }).then(res => {
          if (item.id === this.activeItem.id) this.activeItem = {}
          // 删除成功
          this.$refs.tree.remove(node)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    save() {
      if (this.level === 1) {
        // 保存数据库
        this.formUpServer('details').then(res => {
          res.label = res.databaseName
          if (this.activeNode === null) {
            // 追加新数据库
            this.topResolve([res])
          } else {
            // 修改对应Key的节点
            this.updateNode(res)
          }
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        })
      }
      if (this.level === 2) {
        // 优先保存表，再根据表信息保存字段
        this.formUpServer('tabDetails').then(res => {
          // 修改表信息
          res.label = res.tableName
          res.leaf = true
          this.updateNode(res)
          // 拿到表存储数据，保存节点
          this.formUpServer('tabList', res).then(state => {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
          })
        })
      }
    },
    formUpServer(refsName, parentData) {
      return new Promise(resolve => {
        this.$refs[refsName].save(parentData).then(res => {
          resolve(res)
        }).catch(() => {
          this.$message.error('保存失败，请稍后再试！')
        })
      })
    },
    detailError() {
      this.tabActive = 'details'
    },
    listError() {
      this.tabActive = 'list'
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

  .custom-tree-node {
    width: 100%;
  }
  .custom-tree-title {
    display: inline-block;
    padding: 7px 0;
  }
  .custom-tree-btn {
    float: right;
  }
  @media only screen and (max-width: 768px) {
    .tree-list {
      margin-bottom: 60px;
    }
  }
}
</style>
