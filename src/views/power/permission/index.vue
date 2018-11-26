<template>
  <div class="app-container">
    <tree-table :data="permissionList" :set="set" :columns="columns" border />
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import { mapGetters } from 'vuex'

export default {
  name: 'Permission',
  components: {
    treeTable
  },
  data() {
    return {
      columns: [
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: '权限名称',
          value: 'title'
        },
        {
          text: '权限编码',
          value: 'coding'
        },
        {
          text: '控制器',
          value: 'controller'
        },
        {
          width: 50,
          text: '图标',
          value: 'icon'
        },
        {
          text: '菜单显示',
          value: 'menu'
        },
        {
          text: '排序',
          value: 'sort'
        },
        {
          text: '上一级菜单',
          value: 'parentMenu'
        },
        {
          text: '资源类型',
          value: 'type'
        },
        {
          text: '操作',
          value: 'set'
        }
      ],
      set: {
        edit: true,
        delete: true
      }
    }
  },
  computed: {
    ...mapGetters([
      'permissionList'
    ])
  },
  created() {
    this.getPermission()
  },
  methods: {
    getPermission() {
      this.$store.dispatch('GetPermission').then()
    }
  }
}
</script>
