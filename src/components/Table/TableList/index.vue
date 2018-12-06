<template>
  <div class="table-list">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange">
      <el-table-column v-for="column in columns" :key="column.value" :label="column.text" :width="column.width">
        <template slot-scope="scope">
          <template v-if="column.switch">
            <el-switch :value="switchShow(scope.row[column.value])" disabled @input="switchInput(scope.row,column.switchKey,$event)" />
          </template>
          <span v-else> {{ replace(scope,column) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="!isDialog" align="center" label="设置" width="300px">
        <template slot-scope="scope">
          <el-button v-if="powerConfig" type="primary" size="small" icon="el-icon-setting" @click="confirmConfig(scope.$index)">配置</el-button>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="confirmEdit(scope.$index)">修改</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="confirmDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TableList',
  props: {
    /* eslint-disable */
    columnsReplace: {
      type: Object,
      default: () => {return {}}
    },
    powerConfig: {
      type: Boolean,
      default: false
    },
    list: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    listLoading: {
      type: Boolean,
      default: true
    },
    isDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    switchShow(val) {
      return parseInt(val) === 1
    },
    switchInput(row, key, val) {
      row[key] = val ? 1 : 0
    },
    replace(scope, column) {
      let str = scope.row[column.value]
      if (this.columnsReplace[column.value]) {
        str = this.columnsReplace[column.value][scope.row[column.value]]
      }
      return str
    },
    confirmConfig(index) {
      this.$emit('config', index)
    },
    confirmEdit(index) {
      // 弹出修改窗
      this.$emit('edit', index)
    },
    confirmDelete(index) {
      // 提示是否删除
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用删除
        this.$emit('delete', index)
      })
    },
    handleCurrentChange(val) {
      this.$emit('current-change', val)
    }
  }
}
</script>
<style rel="stylesheet/css">

.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
