<template>
  <div class="plan">
    <el-button
      v-if="isAdd"
      type="primary"
      size="mini"
      icon="el-icon-search"
      class="filter-item"
      style="margin-right: 10px;"
      @click="addForm">
      {{ addName }}
    </el-button>
  </div>
</template>

<script>

export default {
  name: 'OperationPanel',
  props: {
    isAdd: {
      type: Boolean,
      default: false
    },
    addName: {
      type: String,
      default: '新增'
    }
  },
  data() { return {} },
  computed: {
    showTableCloumns() {
      return this.optionList.length > 0
    }
  },
  methods: {
    addForm() {
      this.$emit('add')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';

.table-cloumns {
  display: inline-block;
}

.filter-item {
  vertical-align: middle;
  margin-bottom: $marginBottomMedium;
}
</style>
