<template>
  <div class="table-list">
    <operation-panel :add-name="addName" :is-delete-all="isSelect" :is-add="isOperationAdd" @addForm="addForm" @deleteAll="deleteAll" />
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @current-change="handleCurrentChange" @selection-change="handleSelectionChange">
      <el-table-column
        v-if="isSelect"
        type="selection"
        width="55" />
      <el-table-column v-for="column in columns" :key="column.value" :label="column.text" :width="column.width">
        <template slot-scope="scope">
          <template v-if="column.switch">
            <el-switch :value="switchShow(scope.row[column.value])" @input="switchInput(scope.row,column.switchKey,$event)" />
          </template>
          <span v-else> {{ replace(scope,column) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="!isDialog" align="center" label="设置" width="300px">
        <template slot-scope="scope">
          <el-button v-if="powerConfig" type="primary" size="small" icon="el-icon-setting" @click="confirmConfig(scope.$index)">配置</el-button>
          <el-button v-if="dictPlus" type="primary" size="small" icon="el-icon-plus" @click="addDict(scope.row)">追加</el-button>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="confirmEdit(scope.$index)">修改</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="confirmDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="isFootAdd" class="table-list-add">
      <a href="javascript:void(0)" class="list-add-btn">新增</a>
    </div>
  </div>
</template>

<script>
import OperationPanel from '@/components/Table/OperationPanel'
import { mapGetters } from 'vuex'

export default {
  name: 'TableList',
  props: {
    /* eslint-disable */
    columnsReplace: {
      type: Object,
      default: () => {return {}}
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    addName: {
      type: String,
      default: '新增'
    },
    isOperationAdd: {
      type: Boolean,
      default: true
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    isFootAdd: {
      type: Boolean,
      default: false
    },
    powerConfig: {
      type: Boolean,
      default: false
    },
    dictPlus: {
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
  data() {
    return {
      selectIds: []
    }
  },
  computed: {
    ...mapGetters(['sysDict'])
  },
  components: { OperationPanel },
  methods: {
    addDict(data) {
      let { type, sort } = data
      sort += this._.isNumber(sort) ? 100 : 0
      this.$emit('addDict', { type, sort })
    },
    switchShow(val) {
      return parseInt(val) === 1
    },
    switchInput(row, key, val) {
      row[key] = val ? 1 : 0
      this.$emit('switchToggle', row)
    },
    replace(scope, column) {
      let str = scope.row[column.value]
      if (column.dictType) {
        str = this.sysDict[column.dictType][scope.row[column.value]].label
      }
      return str
    },
    addForm() {
      this.$emit('addForm')
    },
    confirmConfig(index) {
      this.$emit('config', index)
    },
    confirmEdit(index) {
      // 弹出修改窗
      this.$emit('edit', index)
    },
    deleteAll() {
      // 判断是否选中数据
      if (this.selectIds.length > 0) {
        // 提示是否删除
        this.$confirm('此操作将永久删除选中记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 调用删除
          this.$emit('delete', this.selectIds)
        })
      } else {
        this.$message({
          showClose: true,
          message: '未勾选记录'
        })
      }
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
    handleSelectionChange(list) {
      this.selectIds = []
      list.map(item => this.selectIds.push(item.id))
    },
    handleCurrentChange(val) {
      this.$emit('current-change', val)
    }
  }
}
</script>
<style lang="scss">

@import "src/styles/var";

.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

.table-list-add {
  padding: 10px;
  border: 1px solid $borderColor;
  border-top: 0;
  border-collapse: collapse;
  box-sizing: border-box;
}

.list-add-btn {
  display: block;
  height: 32px;
  width: 100%;
  text-align: center;
  line-height: 32px;
  border: 1px dashed #d9d9d9;
  transition: box-shadow 300ms linear;
  &:hover {
    color: $colorLink;
    border-color: $colorLink;
  }
  &:active {
    color: #004f9e;
    border-color: $colorLink;
    box-shadow: 1px 1px 10px 0px $colorLink;
  }
}

</style>
