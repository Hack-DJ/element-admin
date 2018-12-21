<template>
  <div class="app-container permission-container">
    <operation-panel :option-list="optionList" :option-select.sync="optionSelect" :add-name="addName" @addForm="addForm" />
    <tree-table :data="permissionList" :list-loading="listLoading" :set="set" :columns="cloumnsList" border class="permission-tree" @edit="editForm" />
    <add-form
      :item-list="formItemList"
      :rules="rules"
      :form-data="formData"
      :form-title="formTitle"
      :tree-list="generationTree"
      :tree-id-key="permissionIdKey"
      :show.sync="addDialog"
      @save="submitForm" />
  </div>
</template>

<script>
// import { getPermission } from '@/api/power'
import { AddFormMixin } from '@/mixins'
import treeTable from '@/components/TreeTable'
import OperationPanel from '@/components/Table/OperationPanel'
import AddForm from '@/components/Table/AddForm'
import { mapGetters } from 'vuex'

export default {
  name: 'Permission',
  components: {
    AddForm,
    treeTable,
    OperationPanel
  },
  mixins: [AddFormMixin],
  data() {
    return {
      pageName: '菜单',
      // 表单弹窗
      formItemList: [
        {
          label: '类型',
          type: 'radio',
          prop: 'type',
          optionList: [
            { label: '菜单', value: '1' },
            { label: '按钮', value: '0' }
          ]
        },
        {
          label: '上级菜单',
          type: 'parent',
          prop: 'parentId',
          placeholder: '空为一级菜单'
        },
        {
          label: '名称',
          type: 'input',
          prop: 'name',
          placeholder: '请输入菜单名'
        },
        {
          label: '路径',
          type: 'input',
          prop: 'href',
          isShow: 'type',
          placeholder: '请输入菜单路径'
        },
        {
          label: '图标',
          type: 'icon',
          prop: 'icon',
          placeholder: '请选择菜单图标'
        },
        {
          label: '排序',
          type: 'input',
          prop: 'sort',
          placeholder: '排序由小到大'
        },
        {
          label: '可见',
          type: 'switch',
          prop: 'isShow'
        },
        {
          label: '权限标识',
          type: 'input',
          prop: 'permission',
          placeholder: '请输入权限标识'
        },
        {
          label: '备注',
          type: 'input',
          prop: 'remarks',
          inputType: 'textarea'
        }
      ],
      formData: {
        id: '',
        type: '1',
        parentId: '',
        parentName: '',
        name: '',
        href: '',
        icon: '',
        sort: 500,
        isShow: 1,
        permission: '',
        remarks: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ]
      },

      // table列表
      listLoading: true,
      columns: [
        {
          text: '名称',
          value: 'name'
        },
        {
          text: '路径',
          value: 'href'
        },
        {
          width: 50,
          text: '图标',
          value: 'icon'
        },
        {
          text: '可见',
          switch: true,
          width: 60,
          value: 'isShow'
        },
        {
          text: '类型',
          width: 55,
          value: 'type'
        }
      ],
      set: {
        edit: true,
        delete: true
      },
      // table 可选择展示栏
      optionList: [
        {
          text: '排序',
          value: 'sort',
          width: 75
        },
        {
          text: '备注',
          value: 'remarks'
        },
        {
          text: '权限标识',
          value: 'permission'
        }
      ],
      optionSelect: []
    }
  },
  computed: {
    ...mapGetters([
      'permissionList',
      'permissionIdKey',
      'generationTree'
    ]),
    cloumnsList() {
      return this.columns.concat(this.optionSelect)
    }
  },
  created() {
    this.formDataTemp = this._.cloneDeep(this.formData)
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      // this.listLoading = true
      this.$store.dispatch('GetPermission').then(() => {
        this.listLoading = false
      })
      // getPermission().then(res => {
      //   const list = res.data.list
      //   const data = {
      //     route: this.$route,
      //     formData: this.formData,
      //     rules: this.rules,
      //     itemList: this.formItemList,
      //     treeList: list
      //   }
      //   this.$store.dispatch('addViewForm', data)
      // })
    },
    editForm({ index, row }) {
      const key = Object.keys(this.formData)
      this.formData = this._.pick(row, key)
      this.addDialogShow()
    },
    // 提交表单
    submitForm(data) {
      console.log(data)
      // // 格式化存储数据
      const parent = {
        'parent.id': data.parentId,
        'parent.name': data.parentName
      }
      Object.assign(this.formData, data, parent)
      console.log(this.formData)
      this.$store.dispatch('SavePermission', this.formData).then(res => {
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
