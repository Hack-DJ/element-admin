<template>
  <div v-loading="loadingPage" class="app-container" style="padding-top: 0;">
    <form-plan ref="formPlan" :form-data="formData" :rules="rules" :item-list="itemList">
      <!--<quick-btn slot="formBtn" :is-reset="false" @save="save" />-->
    </form-plan>
  </div>
</template>

<script>
import { formatPageData } from '@/utils'
import FormPlan from '@/components/Table/FormPlan'
import QuickBtn from '@/components/Table/FormPlan/components/btn'
import { getConfig, getList, requestForm } from '@/api/base'

export default {
  name: 'PageDetails',
  components: {
    FormPlan,
    QuickBtn
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
      formData: {},
      formDataTemp: {},
      itemList: []
    }
  },
  computed: {
    pageConfigUrl: function() {
      return this.baseUrl + '/config'
    },
    rules() {
      return this.activeItem.rules
    },
    baseUrl() {
      return this.activeItem.baseUrl
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
    getById: function() {
      return this.baseUrl + '/getById'
    },
    activeItemId() {
      return this.activeItem.id
    }
  },
  watch: {
    activeItem: {
      handler: function() {
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
        const { formDate, itemList } = formatPageData(data.columnList)
        itemList.map(item => {
          if (item.prop === 'databaseId') {
            item.display = true
          }
        })
        this.formData = this._.cloneDeep(formDate)
        this.formDataTemp = this._.cloneDeep(formDate)
        this.itemList = itemList
        this.loadingPage = false
        // 是否读取详情
        if (this.activeItemId !== null) {
          this.getDetails()
        } else {
          this.setParentData()
        }
      })
    },
    // 获取表详情
    getDetails() {
      // 获取详情
      getList(this.getById, { id: this.activeItemId }).then(res => {
        const data = res.data.data
        this.formData = this._.cloneDeep(Object.assign(this.formData, data))
        this.formDataTemp = this._.cloneDeep(this.formData)
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
    // 保存
    save() {
      return new Promise((resolve, reject) => {
        this.$refs.formPlan.submitForm().then(data => {
          this.$store.dispatch('showAddFormLoading')
          requestForm(this.saveUrl, { json: data }).then(res => {
            resolve(res.data.data)
          }).catch(() => {
            reject()
          })
        }).catch(() => {
          console.log('详情验证失败')
          this.$emit('detailError')
        })
      })
    },
    // 重置
    reset() {
      this.$refs.formPlan.resetForm(this.formDataTemp)
    }
  }
}
</script>
