<template>
  <el-dialog :visible="show" title="请选择" append-to-body @close="dialogClose">
    <el-tree
      ref="tree"
      :data="treeList"
      :props="defaultProps"
      class="filter-tree"
      @node-click="parentMenuClick"
    />
    <div class="dialog-foot-button-group">
      <el-button type="primary" @click="parentMenuConfirm">确定</el-button>
      <el-button @click="parentMenuClear">设置为一级菜单</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'DialogParentTree',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // 树形展示节点名及节点字段
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'name'
        }
      }
    },
    treeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      parentTempData: {}
    }
  },
  methods: {
    // 父树弹窗
    parentMenuClick(data) {
      this.parentTempData = data
    },
    parentMenuConfirm() {
      // 返回选中对象
      this.$emit('change', this.parentTempData)
      this.dialogClose()
    },
    parentMenuClear() {
      // 清空菜单选项
      this.parentTempData = {}
      this.parentMenuConfirm()
    },
    dialogClose() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
