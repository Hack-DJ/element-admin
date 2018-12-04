<template>
  <div class="app-container">
    <operation-panel :add-name="'新增' + pageName" @addForm="addForm" />
    <tree-table :data="dataSourceTypeList" :list-loading="listLoading" :set="set" :columns="cloumnsList" border class="permission-tree" @edit="editForm" />
    <add-form
      :item-list="formItemList"
      :rules="rules"
      :form-data="formData"
      :form-title="formTitle"
      :tree-list="dataSourceTypeTree"
      :tree-id-key="dataSourceTypeIdKey"
      :show.sync="addDialog"
      @save="submitForm" />
  </div>
</template>

<script>
import { AddFormMixin } from '@/mixins'
import treeTable from '@/components/TreeTable'
import OperationPanel from '@/components/Table/OperationPanel'
import AddForm from '@/components/Table/AddForm'
import { mapGetters } from 'vuex'

export default {
  name: 'DataSourceType',
  components: {
    AddForm,
    treeTable,
    OperationPanel
  },
  mixins: [AddFormMixin],
  data() {
    const PageName = '类型'
    return {
      pageName: PageName,
      // 表单弹窗
      formItemList: [
        {
          label: '类型名称',
          type: 'input',
          prop: 'name'
        },
        {
          label: `上级${PageName}`,
          type: 'parent',
          prop: 'parentId',
          placeholder: `空为一级${PageName}`
        }
      ],
      formData: {
        id: '',
        name: '',
        parentId: '',
        parentName: ''
      },
      rules: {
        name: [
          { required: true, message: `请输入${PageName}名称`, trigger: 'blur' }
        ]
      },

      // table列表
      listLoading: true,
      cloumnsList: [
        {
          text: '类型名称',
          value: 'name'
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
      'dataSourceTypeList',
      'dataSourceTypeIdKey',
      'dataSourceTypeTree'
    ])
  },
  created() {
    this.formDataTemp = this._.cloneDeep(this.formData)
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      this.$store.dispatch('GetDataSourceType').then(() => {
        this.listLoading = false
      })
    },
    editForm({ index, row }) {
      const key = Object.keys(this.formData)
      this.formData = this._.pick(row, key)
      this.addDialogShow()
    },
    // 提交表单
    submitForm(data) {
      // // 格式化存储数据
      const parent = {
        'parent.id': data.parentId,
        'parent.name': data.parentName
      }
      this.$store.dispatch('SaveDataSourceType', Object.assign(this.formData, data, parent)).then(res => {
        this.addDialog = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/var';

.plan {
  margin-bottom: $marginBottomMedium;
  .table-cloumns {
    display: inline-block;
    vertical-align: middle;
    @media screen and (max-width: 397px) {
      margin-top: 10px;
    }
  }
}
</style>
