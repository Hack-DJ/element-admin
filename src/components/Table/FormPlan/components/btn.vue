<template>
  <div class="quick-btn">
    <el-button size="small" type="primary" @click="add">新增</el-button>
    <el-button size="small" type="success" @click="save">提交</el-button>
    <el-button size="small" @click="reset">重置</el-button>
    <el-button size="small" type="danger">删除</el-button>
  </div>
</template>

<script>
export default {
  name: 'QuickBtn',
  methods: {
    add() {
      this.$emit('add')
    },
    save() {
      this.$emit('save')
    },
    reset() {
      this.$emit('reset')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
