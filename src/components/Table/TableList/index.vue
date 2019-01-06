<template>
  <div class="table-list">
    <operation-panel :add-name="addName" :is-delete-all="isSelect" :is-add="isOperationAdd" @addForm="addForm" @deleteAll="deleteAll" />
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange">
      <el-table-column
        v-if="isSelect"
        type="selection"
        width="55" />
      <el-table-column v-for="column in columns" :key="column.value" :label="column.text" :width="column.width">
        <template slot-scope="scope">
          <template v-if="column.switch">
            <el-switch :value="switchShow(scope.row[column.value])" @input="switchInput(scope.row,column.switchKey,$event)" />
          </template>
          <template v-else-if="column.isInput">
            <span v-if="column.type==='winselect'">{{ replace(scope,column) }}</span>
            <el-select
              v-else-if="column.value==='slaveCollectTableId'"
              v-model="scope.row[column.value]"
              :loading="loading"
              :disabled="inputDisabled(column)"
              filterable
              clearable>
              <el-option
                v-for="item in optionList[column.value]"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
            <el-input v-else v-model="scope.row[column.value]" :disabled="inputDisabled(column)" />
          </template>
          <span v-else> {{ replace(scope,column) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="!isDialog" :width="setColumnWidth" align="center" label="设置">
        <template slot-scope="scope">
          <el-button v-if="powerConfig" type="primary" size="small" icon="el-icon-setting" @click="confirmConfig(scope.$index)">配置</el-button>
          <el-button v-if="dictPlus" type="primary" size="small" icon="el-icon-plus" @click="addDict(scope.row)">追加</el-button>
          <el-button v-if="isEdit" type="primary" size="small" icon="el-icon-edit" @click="confirmEdit(scope.$index)">修改</el-button>
          <el-button v-if="isDelete" type="danger" size="small" icon="el-icon-delete" @click="confirmDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="isFootAdd" class="table-list-add">
      <a href="javascript:void(0)" class="list-add-btn" @click="addForm">新增</a>
    </div>
  </div>
</template>

<script>

import { getList } from '@/api/base'
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
    isEdit: {
      type: Boolean,
      default: true
    },
    isDelete: {
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
      selectIds: [],
      optionList: {},
      loading: false
    }
  },
  computed: {
    ...mapGetters(['sysDict']),
    setColumnWidth() {
      let i = 1
      if (this.powerConfig) i++
      if (this.dictPlus) i++
      if (this.isEdit) i++
      if (this.isDelete) i++
      return `${75 * i}px`
    }
  },
  watch: {
    columns: {
      handler(val) {
        // 发生改变，读取select选项
        this.loadingOption()
      },
      deep: true,
      immediate: true
    }
  },
  components: { OperationPanel },
  methods: {
    loadingOption() {
      // 判断是否已经加载过

      this.columns.map(column => {
        if (column.value === 'slaveCollectTableId') {
          this.loading = true
          getList(column.selectUrl, column.selectParam).then(res => {
            this.loading = false
            const data = res.data.data
            this.optionList[column.value] = []
            data.map(item => {
              this.optionList[column.value].push({ value: item.id, label: item.label })
            })
          }).catch(() => {

            this.loading = false
          })
        }
      })
    },
    inputDisabled(item) {
      if (item.id) {
        return !item.isEdit
      } else {
        return !item.isAdd
      }
    },
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
      if (column.type === 'winselect') {
        str = scope.row[column.key][column.value]
      }
      if (column.dictType) {

        this.sysDict[column.dictType].some(item => {
          if (item.value === str) {
            str = item.label
            return true
          }
        })

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
