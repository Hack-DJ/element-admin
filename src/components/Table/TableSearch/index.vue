<template>
  <div :class="{'search-fold':searchFold}" class="table-search">
    <el-form label-width="100px">
      <div :class="{'fold':searchFold}" class="search-item">
        <template v-for="(row, index) in searchList">
          <el-row v-if="index===0 || !searchFold" :key="index">
            <el-col v-for="(col,key) in row" :xs="24" :sm="6" :key="index+'-'+key">
              <el-form-item :label="col.label">
                <el-input v-if="col.type==='input'" v-model="col.value" />
                <el-select v-if="col.type==='select'" v-model="col.value" clearable placeholder="请选择">
                  <el-option
                    v-for="item in col.optionList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </div>
      <span class="search-btn">
        <el-button size="mini" type="primary">查询</el-button>
        <el-button size="mini" @click="resetForm">重置</el-button>
        <el-button type="text" @click="searchFold = !searchFold">{{ searchText }}
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
}

.el-select {
  width: 100%;
}
</style>
