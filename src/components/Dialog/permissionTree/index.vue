<template>
  <el-dialog :visible="show" title="请选中上级菜单">
    <!--<el-tree-->
    <!--ref="tree2"-->
    <!--:data="generationTree"-->
    <!--:props="defaultProps"-->
    <!--class="filter-tree"-->
    <!--@node-click="parentMenuClick"-->
    <!--/>-->
    <div class="dialog-foot-button-group">
      <el-button type="primary" @click="parentMenuConfirm">确定</el-button>
      <el-button @click="parentMenuClear">设置为一级菜单</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DialogIcon',
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
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      parentTempData: {}
    }
  },
  computed: {
    ...mapGetters([
      'permissionList',
      'permissionIdKey',
      'generationTree'
    ]),
    permissionIdToName() {
      console.log(this.ruleForm)
      const tmp = this.permissionIdKey[this.ruleForm.parentId]
      return tmp ? tmp.name : ''
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
      this.$emit('update:show', false)
    },
    parentMenuClear() {
      // 清空菜单选项
      this.ruleForm.parentId = null
      this.parentTempData = {}
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
