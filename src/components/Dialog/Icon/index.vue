<template>
  <el-dialog :visible="show" title="请选择图标" @close="dialogHide">
    <div class="icons-wrapper">
      <div v-for="item of iconsMap" :key="item" class="icon-item" @click="iconClick(item)">
        <svg-icon :icon-class="item" class-name="disabled" />
        <span>{{ item }}</span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import icons from '@/utils/requireIcons'

export default {
  name: 'DialogIcon',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      iconsMap: icons
    }
  },
  methods: {
    iconClick(text = '') {
      this.$emit('update:icon', text)
      this.dialogHide()
    },
    dialogHide() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/var';

.icons-wrapper {
  margin: 0 auto;
}

.icon-item {
  display: inline-block;
  margin: 20px;
  height: 80px;
  text-align: center;
  min-width: 50px;
  width: 15%;
  font-size: 30px;
  color: #24292e;
  cursor: pointer;
}

span {
  display: block;
  font-size: 24px;
  margin-top: 10px;
}

.disabled {
  pointer-events: none;
}
</style>
