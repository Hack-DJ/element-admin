<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="订单号" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="金额" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
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
        pending: 'danger'
      }
      return statusMap[status]
    },
    statusI18nFilter(status) {
      const statusMap = {
        success: '交易成功',
        pending: '待收货'
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
          'order_no': '95a1417e-dECd-57F9-Cece-F58E5bCd4e5e',
          'timestamp': 1073185216494,
          'username': 'Jason Jones',
          'price': 13557.9,
          'status': 'pending'
        }, {
          'order_no': '42ef3a29-7efA-F7BF-FDDA-19D271f371cD',
          'timestamp': 1410588509376,
          'username': 'Kevin Hernandez',
          'price': 4477.8,
          'status': 'pending'
        }, {
          'order_no': '5bd8EbAA-76Cb-7313-e62E-7b5b26dCFfd5',
          'timestamp': 532232093188,
          'username': 'Deborah Hernandez',
          'price': 5745,
          'status': 'success'
        }, {
          'order_no': 'Ae338ACc-eA78-83FE-1d8e-EE72fC244E3B',
          'timestamp': 1183694995660,
          'username': 'Gary Lewis',
          'price': 7058,
          'status': 'pending'
        }, {
          'order_no': 'c9A1bAA1-28ed-3A6D-1327-e2AAdE5A8FAf',
          'timestamp': 1137783359768,
          'username': 'Betty Brown',
          'price': 9545.13,
          'status': 'pending'
        }, {
          'order_no': '3f6c1F8E-4E37-4E92-F7F3-DCcB9EA0B0c0',
          'timestamp': 756304235810,
          'username': 'Joseph Harris',
          'price': 9777.2,
          'status': 'success'
        }, {
          'order_no': '3A122eFA-320d-51cc-253e-dd2Cb7FfEdee',
          'timestamp': 71916777067,
          'username': 'Sarah Harris',
          'price': 13207.7,
          'status': 'success'
        }, { 'order_no': 'DAbb0c8E-20FC-eC94-Df4B-5390d7fC388e', 'timestamp': 756084475823, 'username': 'Brian Davis', 'price': 12105.8, 'status': 'pending' }
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
