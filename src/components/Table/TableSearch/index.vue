<template>
  <div v-if="searchShow" :class="{'search-fold':searchFold || !searchFoldShow}" class="table-search">
    <el-form label-width="100px">
      <div :class="{'fold':searchFold || !searchFoldShow}" class="search-item">
        <template v-for="(row, index) in searchList">
          <el-row v-if="index===0 || !searchFold" :key="index">
            <el-col v-for="col in row" :xs="24" :sm="colSmNum(row)" :key="col.key">
              <el-form-item :label="col.label">
                <el-input v-if="col.type==='input'" v-model="col.value" />
                <el-autocomplete v-if="col.type==='autocomplete'" v-model="col.value" :fetch-suggestions="((queryString,cb)=>querySearch(queryString,cb,col))" placeholder="请输入内容" />
                <el-select v-if="col.type==='select'" v-model="col.value" clearable placeholder="请选择">
                  <el-option
                    v-for="item in col.optionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
                <el-date-picker
                  v-if="col.type === 'datetime'"
                  v-model="col.value"
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

export default {
  name: 'TableSearch',
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
      searchList: [],
      searchListTemp: []
    }
  },
  computed: {
    searchShow() {
      return this.searchList.length > 0
    },
    searchFoldShow() {
      return this.searchList.length > 1
    },
    searchText() {
      return this.searchFold ? '展开' : '收起'
    }
  },
  watch: {
    search: {
      handler(val) {
        this.searchList = this._.cloneDeep(val)
        this.searchListTemp = this._.cloneDeep(val)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    querySearch(queryString, cb, item) {
      const tmp = []
      item.optionList.map(item => {
        if (!queryString) {
          return tmp.push({ value: item })
        }
        if (item.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) {
          tmp.push({ value: item })
        }
      })
      cb(tmp)
    },
    colSmNum(row) {
      return parseInt(24 / row.length)
    },
    searchClick() {
      const search = {}
      this.searchList.map(row => {
        row.map(item => {
          if (item.value !== null) {
            search[item.key] = item.value
          }
        })
      })
      this.$emit('searchList', search)
    },
    resetForm() {
      this.searchList = this._.cloneDeep(this.searchListTemp)
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
