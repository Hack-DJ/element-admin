<template>
  <div class="app-container" style="padding-top: 0;">
    <table-list
      :list="listShow"
      :columns="columns"
      :list-loading="loadingPage"
      :is-operation-add="false"
      :is-edit="false"
      is-foot-add
      @delete="deleteConfig"
      @addForm="add" />
  </div>
</template>

<script>
import { formatPageData } from '@/utils'
import { getConfig, getList } from '@/api/base'
import TableList from '@/components/Table/TableList'

export default {
  name: 'PageList',
  components: {
    TableList
  },
  props: {
    parentData: {
      type: Object,
      default: () => {}
    },
    activeItem: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loadingPage: true,
      columns: [],
      list: [],
      saveCache: [],
      databaseOptionList: [],
      formData: {}
    }
  },
  computed: {
    listShow: function() {
      return [...this.list, ...this.saveCache]
    },
    pageConfigUrl: function() {
      return this.baseUrl + '/config'
    },
    baseUrl() {
      return this.activeItem.listBase
    },
    saveUrl: function() {
      return this.baseUrl + '/save'
    },
    deleteUrl: function() {
      return this.baseUrl + '/delete'
    },
    listUrl: function() {
      return this.baseUrl + '/list'
    },
    activeItemId() {
      return this.activeItem.id
    }
  },
  watch: {
    activeItem: {
      handler: function() {
        this.columns = []
        this.list = []
        this.saveCache = []
        this.databaseOptionList = []
        this.formData = {}
        this.getPageConfig()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getPageConfig() {
      // 拉取页面配置
      this.loadingPage = true
      getConfig(this.pageConfigUrl).then(res => {
        const data = res.data.data
        this.pageName = data.comments
        const { formDate, columns, itemList } = formatPageData(data.columnList)
        columns.map((item, index) => {
          const { isAddEdit, isEditEdit } = itemList[index]
          item.isInput = true
          item.isAdd = isAddEdit
          item.isEdit = isEditEdit
          if (item.value === 'slaveCollectTableId') {
            // 远程搜索url
            item.selectUrl = '/ips/a/ips/database/getDBTableById'
            // 远程搜索查询条件
            item.selectParam = { id: this.activeItem.databaseId }
          }
        })
        if (this.parentData.id) {
          formDate.collectTableId.id = this.parentData.id
          formDate.collectTableId.tableName = this.parentData.label
        }
        this.formData = this._.cloneDeep(formDate)
        this.columns = columns
        this.loadingPage = false

        // 判断是否读取字段列表 如果有父级则读取
        if (this.activeItemId) {
          this.getList()
        }
      })
    },
    // 获取表详情
    getList() {
      // 获取列表
      getList(this.listUrl, { id: this.activeItemId }).then(res => {
        const data = res.data.data
        this.list = data.list
      })
    },
    // 设置父选项
    setParentData() {
      if (this.parentData) {
        this.formData.databaseId = {
          id: this.parentData.id,
          databaseName: this.parentData.label
        }
        this.formDataTemp.databaseId = this._.cloneDeep(this.formData.databaseId)
      }
    },
    add() {
      const data = this._.cloneDeep(this.formData)
      data.edit = true
      this.saveCache.push(data)
    },
    // 保存
    save(parent) {
      return new Promise((resolve, reject) => {
        console.log(parent)
        // 验证每行数据是否正确
        resolve()
        // this.$store.dispatch('showAddFormLoading')
        // requestForm(this.saveUrl, { json: data }).then(res => {
        //   resolve(res.data.data)
        // }).catch(() => {
        //   reject()
        // })
      })
    },
    deleteConfig(index) {
      console.log(index)
      const data = this.listShow[index]
      if (data.id) {
        // 请求服务器删除

        // 再删除前端数据

        // 无id直接前端删除
        this.list.some((item, i) => {
          if (Object.is(item, data)) {
            this.listShow.splice(index, 1)
            this.list.splice(i, 1)
            return true
          }
        })
      } else {
        // 无id直接前端删除
        this.saveCache.some((item, i) => {
          if (Object.is(item, data)) {
            this.listShow.splice(index, 1)
            this.saveCache.splice(i, 1)
            return true
          }
        })
      }
    }
  }
}
</script>
