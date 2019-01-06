<template>
  <div class="quick-btn">
    <el-button v-if="isSave" size="small" type="primary" @click="save">保存</el-button>
    <el-button v-if="isReset" size="small" @click="reset">重置</el-button>
    <el-button v-if="isAdd" size="small" @click="add">新增</el-button>
    <el-button v-if="isDelete" size="small" type="danger">删除</el-button>
  </div>
</template>

<script>
export default {
  name: 'QuickBtn',
  props: {
    isSave: {
      type: Boolean,
      default: true
    },
    isReset: {
      type: Boolean,
      default: true
    },
    isAdd: {
      type: Boolean,
      default: false
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
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
