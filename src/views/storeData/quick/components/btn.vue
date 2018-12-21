<template>
  <div class="quick-btn">
    <el-button type="primary" @click="save">下一步</el-button>
    <el-button v-if="!start" @click="up">上一步</el-button>
    <el-button @click="reset">重置</el-button>
    <el-button v-if="!end" @click="next">跳过</el-button>
  </div>
</template>

<script>
export default {
  name: 'QuickBtn',
  props: {
    start: {
      type: Boolean,
      default: false
    },
    end: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    up() {
      this.$emit('up')
    },
    next() {
      this.$emit('next')
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
