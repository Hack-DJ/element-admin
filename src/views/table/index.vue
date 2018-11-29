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
        limit: 20
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
        }, {
          'id': 11,
          'timestamp': 155448050325,
          'author': 'Kenneth',
          'reviewer': 'Richard',
          'title': 'Dhtzdhdxk Mdittnh Dqlkorb Chxvo Sicpy Kqfesjjne',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 42.48,
          'importance': 2,
          'type': 'US',
          'status': 'deleted',
          'display_time': '1985-10-17 01:07:21',
          'comment_disabled': true,
          'pageviews': 1682,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 12,
          'timestamp': 238060747509,
          'author': 'Kevin',
          'reviewer': 'Charles',
          'title': 'Fdwovovqip Cmrelbbdn Vueqto Cgmcbmjhj Qtsgwtad Kfjndx Krhhi Gwm',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 63.92,
          'importance': 2,
          'type': 'CN',
          'status': 'draft',
          'display_time': '1986-01-06 21:40:28',
          'comment_disabled': true,
          'pageviews': 3404,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 13,
          'timestamp': 1290513954780,
          'author': 'David',
          'reviewer': 'Larry',
          'title': 'Wpoarp Lmlnbqnyq Ffrrvoun Fkrvffssc Ktocf Rnoop Gjrtsmfsp',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 83.67,
          'importance': 2,
          'type': 'JP',
          'status': 'draft',
          'display_time': '1982-08-08 03:03:03',
          'comment_disabled': true,
          'pageviews': 2530,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 14,
          'timestamp': 1196797291650,
          'author': 'Christopher',
          'reviewer': 'Matthew',
          'title': 'Mnr Fsqqiophl Eieodmvv Woaj Pcgv Jfcyzcvtdg Eclhtjayj Likl Oyslje',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 6.43,
          'importance': 2,
          'type': 'CN',
          'status': 'draft',
          'display_time': '1974-09-10 23:59:47',
          'comment_disabled': true,
          'pageviews': 1763,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 15,
          'timestamp': 1083537768702,
          'author': 'Deborah',
          'reviewer': 'Kimberly',
          'title': 'Bljvh Nokzdxi Pbohh Ntgqcazmyl Zjkkszx Ckvv Cqqdlykfp Rsvhbx Onblcu',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 35.55,
          'importance': 2,
          'type': 'US',
          'status': 'deleted',
          'display_time': '1973-10-10 13:55:01',
          'comment_disabled': true,
          'pageviews': 1105,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 16,
          'timestamp': 5282431996,
          'author': 'Sandra',
          'reviewer': 'Michael',
          'title': 'Ebhui Hwbi Tpp Zspv Hjgpmu Snkqmv Wppfmrmtc Wrbhehvtrv',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 25.03,
          'importance': 1,
          'type': 'EU',
          'status': 'draft',
          'display_time': '2007-01-13 10:52:33',
          'comment_disabled': true,
          'pageviews': 2935,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 17,
          'timestamp': 814185782566,
          'author': 'Jessica',
          'reviewer': 'Eric',
          'title': 'Tesxoqor Opbiqydrgv Jdoy Hlarmox Jcgshvqzgi Trcmklxgt Qbsekt',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 36.16,
          'importance': 3,
          'type': 'EU',
          'status': 'published',
          'display_time': '1981-05-21 10:11:36',
          'comment_disabled': true,
          'pageviews': 1350,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 18,
          'timestamp': 966090635271,
          'author': 'Laura',
          'reviewer': 'Patricia',
          'title': 'Pswyg Yqvlvhuzq Unp Nuilkmci Tkuhccwe Lsoh Qsxlblk Pribjxg Rrftwrz',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 48.62,
          'importance': 3,
          'type': 'US',
          'status': 'published',
          'display_time': '2018-07-28 18:44:59',
          'comment_disabled': true,
          'pageviews': 2922,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 19,
          'timestamp': 1226010384097,
          'author': 'Jennifer',
          'reviewer': 'Frank',
          'title': 'Iljuwqn Dymjpppyv Vtwebsbw Tcuhtnwue Ehxpp Lcsduhyeb Dvor Zbugynhs Ptk',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 92.76,
          'importance': 3,
          'type': 'US',
          'status': 'draft',
          'display_time': '2017-03-15 01:50:09',
          'comment_disabled': true,
          'pageviews': 1123,
          'image_uri': 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
          'platforms': ['a-platform']
        }, {
          'id': 20,
          'timestamp': 472770557406,
          'author': 'Ronald',
          'reviewer': 'Donna',
          'title': 'Wtltbkhye Gdrhcgn Gasqjvx Rwkobgbikd Xnie Cnt',
          'content_short': '我是测试数据',
          'content': '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
          'forecast': 67.18,
          'importance': 2,
          'type': 'US',
          'status': 'deleted',
          'display_time': '2013-11-20 01:59:44',
          'comment_disabled': true,
          'pageviews': 2623,
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
