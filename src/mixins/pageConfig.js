import { formatPageData } from '@/utils'
import { getConfig } from '@/api/basicConfig'

const pageConfig = {
  computed: {
    pageConfigUrl: function() {
      return this.baseUrl + '/config'
    },
    saveUrl: function() {
      return this.baseUrl + '/save'
    },
    deleteUrl: function() {
      return this.baseUrl + '/delete'
    }
  },
  created() {
    this.getPageConfig()
  },
  methods: {
    getPageConfig() {
      // 拉取页面配置
      getConfig(this.pageConfigUrl).then(res => {
        const data = res.data.data
        this.pageName = data.comments
        const { formDate, columns, itemList, searchList } = formatPageData(data.columnList)
        console.log(JSON.stringify(formDate))
        this.formDataTemp = Object.assign(formDate, {})
        this.formData = Object.assign(formDate, {})
        this.columns = columns
        this.itemList = itemList
        this.searchList = searchList
        this.loadingPage = false
        // 读取列表
        this.getList()
      })
    }
  }
}
export default pageConfig
