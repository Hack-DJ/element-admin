<template>
  <div v-if="searchShow" :class="{'search-fold':searchFold || !searchFoldShow}" class="table-search">
    <el-form ref="search" :model="searchForm" label-width="100px">
      <div :class="{'fold':searchFold || !searchFoldShow}" class="search-item">
        <template v-for="(row, index) in searchItem">
          <el-row v-if="index===0 || !searchFold" :key="index" :gutter="10">
            <el-col v-for="col in row" :xs="24" :sm="colSmNum(row)" :key="col.key">
              <el-form-item :label="col.label" :prop="col.key">
                <el-input v-if="col.type==='input'" v-model="searchForm[col.key]" />
                <el-autocomplete
                  v-if="col.type==='autocomplete'"
                  v-model="searchForm[col.key]"
                  :fetch-suggestions="((queryString,cb)=>querySearch(queryString,cb,col.dictType))"
                  placeholder="请输入内容" />

                <el-select v-if="col.type==='select'" v-model="searchForm[col.key]" clearable placeholder="请选择">
                  <el-option
                    v-for="item in selectOption(col.dictType)"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>

                <el-date-picker
                  v-if="col.type === 'datetime'"
                  v-model="searchForm[col.key]"
                  type="datetime"
                  placeholder="选择日期时间" />
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </div>
      <span class="search-btn">
        <el-button size="mini" type="primary" @click="searchClick">查询</el-button>
        <el-button size="mini" @click="resetForm">重置</el-button>
        <el-button v-if="searchFoldShow" type="text" @click="searchFold = !searchFold">{{ searchText }}
        <i :class="[searchFold ? 'el-icon-arrow-down' : 'el-icon-arrow-up']" /></el-button>
      </span>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BaseTableSearch',
  props: {
    search: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 查询框
      searchFold: false,
      searchForm: {}
    }
  },
  computed: {
    ...mapGetters([
      'sysDict'
    ]),
    searchItem() {
      const copy = []
      this.search.forEach((value, index) => {
        if (index % 4 === 0) copy[Math.floor(index / 4)] = []
        copy[Math.floor(index / 4)].push(value)
      })
      return copy
    },
    searchShow() {
      return this.searchItem.length > 0
    },
    searchFoldShow() {
      return this.searchItem.length > 1
    },
    searchText() {
      return this.searchFold ? '展开' : '收起'
    }
  },
  watch: {
    search: {
      handler(val) {
        const form = {}
        val.forEach(value => {
          this.$set(form, value.key, '')
        })
        this.searchForm = form
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    selectOption(dictType) {
      return this.sysDict[dictType]
    },
    querySearch(queryString, cb, dictType) {
      const tmp = []
      this.sysDict[dictType].map(item => {
        if (!queryString) {
          return tmp.push({ value: item.label })
        }
        if (item.label.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
          tmp.push({ value: item.label })
        }
      })
      cb(tmp)
    },
    colSmNum(row) {
      return parseInt(24 / row.length)
    },
    searchClick() {
      this.$emit('searchList', this.searchForm)
    },
    resetForm() {
      this.$refs.search.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/var';

.table-search {
  margin-bottom: $marginBottomMedium * 2.5;
  .fold {
    width: calc(100% - 216px);
    display: inline-block;
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }
  .search-btn {
    float: right;
    margin-top: 3px;
  }
  &.search-fold {
    margin-bottom: 0;
    @media screen and (max-width: 900px) {
      margin-bottom: $marginBottomMedium * 2.5;
    }
  }

  .el-autocomplete {
    display: block;
  }
}

.el-select {
  width: 100%;
}
</style>
