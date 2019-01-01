<template>
  <div class="plan">
    <el-button type="primary" size="mini" icon="el-icon-plus" class="filter-item" @click="addForm">{{ addName }}</el-button>
    <el-button v-if="isDeleteAll" type="danger" size="mini" icon="el-icon-delete" class="filter-item" @click="deleteAll">批量删除</el-button>
    <div v-if="showTableCloumns" class="table-cloumns filter-item" style="margin-left: 10px;">
      <el-checkbox-group v-model="optionSelect" @change="checkChange">
        <el-checkbox v-for="item in optionList" :label="item" :key="item.value">{{ item.text }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>

export default {
  name: 'OperationPanel',
  props: {
    isDeleteAll: {
      type: Boolean,
      default: false
    },
    addName: {
      type: String,
      default: '新增'
    },
    optionList: { type: Array, default: () => [] }
  },
  data() {
    return {
      optionSelect: []
    }
  },
  computed: {
    showTableCloumns() {
      return this.optionList.length > 0
    }
  },
  methods: {
    addForm() {
      this.$emit('addForm')
    },
    checkChange(select) {
      this.$emit('update:optionSelect', select)
    },
    deleteAll() {
      this.$emit('deleteAll')
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
