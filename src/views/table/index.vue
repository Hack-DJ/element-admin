<template>
  <div class="app-container">

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="scope">

          <router-link :to="'/example/edit/'+scope.row.id" class="link-type">
            <span>{{ scope.row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="'/example/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = false
      this.list = [
        {
          'id': 1,
          'timestamp': 770848311301,
          'author': 'Jennifer',
          'reviewer': 'Paul',
          'title': 'Qzdlh Wqclvl Sskbgough Heljiyj Kwkwb Hnrin',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 79.85,
          'importance': 2,
          'type': 'EU',
          'status': 'published',
          'display_time': '2003-11-24 03:02:33',
          'comment_disabled': true,
          'pageviews': 4755,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 2,
          'timestamp': 1161965076171,
          'author': 'Margaret',
          'reviewer': 'Kimberly',
          'title': 'Utobn Oseqr Gqcefig Sxhne Uhvu Tqenyxn',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 12.06,
          'importance': 3,
          'type': 'US',
          'status': 'draft',
          'display_time': '2004-01-23 20:17:25',
          'comment_disabled': true,
          'pageviews': 2107,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 3,
          'timestamp': 666599306386,
          'author': 'Melissa',
          'reviewer': 'Melissa',
          'title': 'Fqpaqrkt Hxdesc Epcduqbfx Xwwcpxiqlu Mouonfwovr Jgwdz Nwirlo',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 42.54,
          'importance': 1,
          'type': 'EU',
          'status': 'draft',
          'display_time': '1970-02-22 04:37:47',
          'comment_disabled': true,
          'pageviews': 2186,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 4,
          'timestamp': 1008205951113,
          'author': 'Michael',
          'reviewer': 'Jessica',
          'title': 'Tmdxwefc Wilkcedm Xiwdgy Etemuwsexs Wsieuz Vfmzzt',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 100.39,
          'importance': 2,
          'type': 'CN',
          'status': 'deleted',
          'display_time': '2008-10-12 00:57:45',
          'comment_disabled': true,
          'pageviews': 1096,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 5,
          'timestamp': 322256963157,
          'author': 'John',
          'reviewer': 'Margaret',
          'title': 'Fnml Qfgsvsgnl Jsmpcem Csljxgrwu Miyrnfr Rwbypg Agncqkj Nqyeeir',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 11.24,
          'importance': 2,
          'type': 'US',
          'status': 'published',
          'display_time': '1971-08-13 06:46:11',
          'comment_disabled': true,
          'pageviews': 3789,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 6,
          'timestamp': 798267071977,
          'author': 'Donald',
          'reviewer': 'John',
          'title': 'Cebs Xwcphr Hcqu Uycpfepj Inwralku Qdxqxtibtx Mdvem',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 89.66,
          'importance': 2,
          'type': 'JP',
          'status': 'published',
          'display_time': '2007-12-28 19:41:09',
          'comment_disabled': true,
          'pageviews': 3785,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 7,
          'timestamp': 780941444926,
          'author': 'Paul',
          'reviewer': 'Shirley',
          'title': 'Iswxbf Hlhdk Xugmkcmqk Vknprowjnp Bbdqnyqi Bwnfu Iwencj Lvrkfren Ppniffec',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 16.84,
          'importance': 3,
          'type': 'JP',
          'status': 'published',
          'display_time': '1999-01-03 13:24:15',
          'comment_disabled': true,
          'pageviews': 1981,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 8,
          'timestamp': 374174063831,
          'author': 'Cynthia',
          'reviewer': 'Anthony',
          'title': 'Ccsilhpbh Zhjh Coccgyug Benmj Nbge Khyyyu Verfci Ott Wklct',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 23.63,
          'importance': 3,
          'type': 'JP',
          'status': 'draft',
          'display_time': '1972-02-13 13:05:16',
          'comment_disabled': true,
          'pageviews': 1886,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 9,
          'timestamp': 488973465700,
          'author': 'Thomas',
          'reviewer': 'Deborah',
          'title': 'Ebpxowhcp Onzbtbxk Nguetpci Pqtlwj Ytlmriw Sjlqvsay Lqnwvfbkfe Btap Veqbn Ezhxkacg',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 20.42,
          'importance': 1,
          'type': 'JP',
          'status': 'published',
          'display_time': '2008-01-16 23:56:41',
          'comment_disabled': true,
          'pageviews': 4622,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 10,
          'timestamp': 543634824773,
          'author': 'John',
          'reviewer': 'Jason',
          'title': 'Spgh Nxqbwfhco Qigqvzkq Bbpshewgyx Lgpfvvne Hcvfjoppg',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 87.39,
          'importance': 2,
          'type': 'CN',
          'status': 'published',
          'display_time': '1985-10-25 03:23:34',
          'comment_disabled': true,
          'pageviews': 3528,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }]
      this.total = 100
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.total = response.data.total
      //   this.listLoading = false
      // })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      // this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      // this.getList()
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
