<template>
  <div class="permission">
    <el-table v-loading="listLoading" :data="formatData" :row-style="showRow" v-bind="$attrs">
      <el-table-column v-if="columns.length===0" width="150">
        <template slot-scope="scope">
          <span v-for="space in scope.row._level" :key="space" class="ms-tree-space" />
          <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus" />
            <i v-else class="el-icon-minus" />
          </span>
          {{ scope.$index }}
        </template>
      </el-table-column>
      <template v-else>
        <el-table-column
          v-for="(column, index) in columns"
          :key="column.value"
          :label="column.text"
          :width="column.width">
          <template
            slot-scope="scope">
            <!-- Todo -->
            <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
            <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space" />
            <span
              v-if="iconShow(index,scope.row)"
              class="tree-ctrl"
              @click="toggleExpanded(scope.$index)">
              <i v-if="!scope.row._expanded" class="el-icon-plus" />
              <i v-else class="el-icon-minus" />
            </span>
            <template v-if="column.value==='icon'">
              <svg-icon :icon-class="scope.row[column.value]" />
            </template>
            <template v-else-if="column.switch">
              <el-switch :value="switchShow(scope.row[column.value])" disabled @input="switchInput(scope.row,$event)" />
            </template>
            <template v-else>
              {{ scope.row[column.value] }}
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="192px">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="confirmEdit(scope.$index,scope.row)">修改</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="confirmDelete(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <!--<el-table-column v-if="set.edit||set.delete" label="操作" width="192px">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button v-if="scope.row.edit" type="primary" size="small" icon="el-icon-edit" @click="confirmEdit(scope.$index,scope.row)">修改</el-button>-->
        <!--<el-button v-if="scope.row.delete" type="danger" size="small" icon="el-icon-delete" @click="confirmDelete(scope.$index,scope.row)">删除</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </template>
      <slot />
    </el-table>
  </div>
</template>

<script>
import treeToArray from './dj-eval'

export default {
  name: 'TreeTable',
  props: {
    /* eslint-disable */
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs:
    Array,
    expandAll: {
      type: Boolean,
      default:
        false
    },
    set: {
      type: Object,
      default: () => { return { edit: false, delete: false } }
    },
    listLoading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  methods: {
    switchShow(val) {
      return parseInt(val) === 1
    },
    switchInput(row, val) {
      row.isShow = val ? 1 : 0
    },
    showRow: function(row) {
      const show = (parseInt(row.row.parentId) !== 1 ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    // 修改数据
    confirmEdit(index, row) {
      // 弹出修改窗
      this.$emit('edit', { index: index, row: row })
    },
    // 删除数据
    confirmDelete(index, row) {

      // 判断是否有子菜单,有则禁止删除
      if (this.formatData.some(item => { return item.parentId === row.id })) {
        return this.$message({
          type: 'info',
          message: '该记录下有子记录,禁止删除'
        })
      }
      // 提示是否删除
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formatData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style rel="stylesheet/css">
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
$color-blue: #2196F3;
$space-width: 18px;
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: $space-width;
  height: 14px;
  &::before {
    content: ""
  }
}

.processContainer {
  width: 100%;
  height: 100%;
}

table td {
  line-height: 26px;
}

.svg-icon {
  margin-left: 5px;
}

.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: $color-blue;
  margin-left: -$space-width;
}
</style>
