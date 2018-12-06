<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="爬虫任务" min-width="180">
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="爬取数量" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter"> {{ scope.row.status | statusI18nFilter }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import { fetchList } from '@/api/transaction'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'warning',
        fail: 'danger'
      }
      return statusMap[status]
    },
    statusI18nFilter(status) {
      const statusMap = {
        success: '完成',
        pending: '进行中',
        fail: '失败'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: [
        {
          'order_no': '百度IOP',
          'price': 1355,
          'status': 'pending'
        }, {
          'order_no': '高德IOP',
          'price': 4477,
          'status': 'pending'
        }, {
          'order_no': '大众点评',
          'price': 5745,
          'status': 'success'
        }, {
          'order_no': '百度糯米',
          'price': 7058,
          'status': 'fail'
        }, {
          'order_no': '链家',
          'price': 9545,
          'status': 'pending'
        }, {
          'order_no': '58同城',
          'price': 9777,
          'status': 'success'
        }, {
          'order_no': '豆瓣',
          'price': 13207,
          'status': 'success'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // fetchList().then(response => {
      //   this.list = response.data.items.slice(0, 8)
      // })
    }
  }
}
</script>
