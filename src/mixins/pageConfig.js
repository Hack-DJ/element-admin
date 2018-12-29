import { formatPageData } from '@/utils'
import { getConfig } from '@/api/basicConfig'

const pageConfig = {
  created() {
    // 拉取页面配置
    getConfig(this.pageConfigUrl).then(res => {
      this.loadingPage = false
      const data = res.data.data
      this.pageName = data.comments
      const { formDate, columns, itemList, searchList } = formatPageData(data.columnList)
      this.formDataTemp = Object.assign(formDate, {})
      this.formData = formDate
      this.columns = columns
      this.itemList = itemList
      this.searchList = searchList
      // 读取列表
      this.getList()
    })
  }
}
export default pageConfig
