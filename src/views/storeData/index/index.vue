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
            :data="data"
            :load="getList"
            lazy
            highlight-current
            node-key="id"
            default-expand-all
            @node-click="treeClick" />
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">2</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scrollTo'
import { getStoreTree } from '@/api/storeData'

export default {
  name: 'StoreDataIndex',
  data() {
    return {
      filterText: '',
      data: [
        {
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }],
          name: 'abc'
        },
        {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        },
        {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        },
        {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        },
        {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        },
        {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        },
        {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        },
        {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      activeItem: null
    }
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    getList() {
      if (this.activeItem === null) {
        // 加载第一层
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    treeClick(item) {
      this.activeItem = item
      scrollTo(0, 800, '.app-main')
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
