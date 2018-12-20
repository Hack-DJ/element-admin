<template>
  <div class="app-container">
    <table-search :search="searchList" @searchList="searchChang" />
    <operation-panel :option-list="optionList" :add-name="addName" :option-select.sync="optionSelect" @addForm="addForm" />
    <table-list :list="list" :columns="cloumnsList" :list-loading="listLoading" :columns-replace="columnsReplace" @edit="editForm" @delete="confirmDelete" />
    <pagination v-show="count>0" :total="count" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <add-form
      :item-list="formItemList"
      :rules="rules"
      :form-data="formData"
      :form-title="formTitle"
      :show.sync="addDialog"
      @save="submitForm" />
  </div>
</template>

<script>
import { getData } from '@/api/storeData'
import { OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin } from '@/mixins'
import OperationPanel from '@/components/Table/OperationPanel'
import TableSearch from '@/components/Table/TableSearch'
import AddForm from '@/components/Table/AddForm'
import TableList from '@/components/Table/TableList'
import Pagination from '@/components/Pagination'

export default {
  name: 'StoreDataData',
  components: { TableSearch, OperationPanel, AddForm, TableList, Pagination },
  mixins: [OperationMixin, PaginationMixin, TableSearchMixin, AddFormMixin],
  data() {
    return {
      pageName: '采集内容',
      // search 查询面板
      searchList: [
        [
          {
            label: '数据库表',
            type: 'select',
            key: 'collect_table_id',
            optionList: [{ label: '数据库表1', value: 1 }, { label: '数据库表2', value: 2 }, { label: '数据库表3', value: 3 }]
          },
          {
            label: '字段代码',
            type: 'input',
            key: 'field_code'
          },
          {
            label: '字段名',
            type: 'input',
            key: 'field_name'
          },
          {
            label: '字段长度',
            type: 'input',
            key: 'field_length'
          }
        ]
      ],
      // table 表格
      list: [],
      listLoading: true,
      columns: [
        {
          text: '数据库表',
          value: 'collect_table_id'
        },
        {
          text: '字段代码',
          value: 'field_code'
        },
        {
          text: '字段名',
          value: 'field_name'
        },
        {
          text: '字段长度',
          value: 'field_length'
        },
        {
          text: '采集子表主键',
          value: 'slave_collect_table_id'
        },
        {
          text: '修改数据字段',
          width: 60,
          switch: true,
          value: 'is_update'
        }
      ],
      columnsReplace: {
        collect_table_id: {
          '9dfbCf66-6fd3-8db9-dB23-5C23e13fb73d': '房天下',
          '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD': '安居客',
          '14B26EfC-08C4-15F3-dDFE-aBaefC911B16': '链家',
          '14B26EfC-08C4-15F3-dDFE-aBagfC911B11': '饿了么',
          '14B26EfC-08C4-15F3-dDFE-aBawfC911B12': '百度',
          '14B26EfC-08C4-15F3-dD2E-aBdefC911B11': '豆瓣',
          '14B26EfC-08C4-15F3-dcFE-aBbefC911B12': '搜狗'
        },
        slave_collect_table_id: {
          '9dfbCf66-6fd3-8db9-dB23-5C23e13fb73d': '房天下',
          '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD': '安居客',
          '14B26EfC-08C4-15F3-dDFE-aBaefC911B16': '链家',
          '14B26EfC-08C4-15F3-dDFE-aBagfC911B11': '饿了么',
          '14B26EfC-08C4-15F3-dDFE-aBawfC911B12': '百度',
          '14B26EfC-08C4-15F3-dD2E-aBdefC911B11': '豆瓣',
          '14B26EfC-08C4-15F3-dcFE-aBbefC911B12': '搜狗'
        }
      },
      // 表单弹窗
      formDialog: false,
      formItemList: [
        {
          label: '数据库表',
          type: 'parent',
          inputType: 'list',
          placeholder: '请选择数据库表',
          prop: 'collect_table_id',
          listUrl: 'http://code2012.cn/rapServer/app/mock/18/storedata/table',
          pageName: '数据库表',
          parentCloumnsList: [
            {
              text: '数据库',
              value: 'database_id'
            },
            {
              text: '表名',
              value: 'table_name'
            },
            {
              text: '类型',
              value: 'table_type'
            },
            {
              text: '表code',
              value: 'table_code'
            },
            {
              text: '备注',
              value: 'remarks'
            }
          ],
          parentSearchCriteria: [
            [
              {
                label: '数据库',
                type: 'select',
                key: 'database_id',
                value: null,
                optionList: [{ label: '数据库1', value: 1 }, { label: '数据库2', value: 2 }, { label: '数据库3', value: 3 }]
              },
              {
                label: '表名',
                type: 'input',
                key: 'table_name',
                value: null
              },
              {
                label: '表类型',
                type: 'input',
                key: 'table_type',
                value: null
              },
              {
                label: '表code',
                type: 'input',
                key: 'table_code',
                value: null
              }
            ]
          ],
          parentReplace: {
            database_id: {
              '9dfbCf66-6fd3-8db9-dB23-5C23e13fb73d': 'POI类',
              '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD': '房屋信息类',
              '14B26EfC-08C4-15F3-dDFE-aBaefC911B16': '团购外卖类',
              '14B26EfC-08C4-15F3-dDFE-aBaefC911ccd': '旅游类'
            }
          }
        },
        {
          label: '字段代码',
          type: 'input',
          placeholder: '请输入字段代码',
          prop: 'field_code'
        },
        {
          label: '字段名',
          type: 'input',
          placeholder: '请输入字段名',
          prop: 'field_name'
        },
        {
          label: '字段长度',
          type: 'input',
          placeholder: '请输入字段长度',
          prop: 'field_length'
        },
        {
          label: '是否修改数据字段',
          type: 'select',
          placeholder: '是否修改数据字段',
          optionList: [{ label: '是', value: '0' }, { label: '否', value: '1' }],
          prop: 'is_update'
        },
        {
          label: '采集子表主键',
          type: 'select',
          placeholder: '采集子表主键',
          optionList: [{ label: '表1', value: '0' }, { label: '表2', value: '1' }],
          prop: 'slave_collect_table_id'
        }
      ],
      formData: {
        id: ''
      },
      rules: {
        tableId: [
          { required: true, message: '请选择数据库表', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入内容名', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const tmp = {}
    this.formItemList.forEach(item => {
      tmp[item.prop] = item.value || ''
    })
    Object.assign(this.formData, tmp)
    this.formDataTemp = this._.cloneDeep(this.formData)
    this.getList()
  },
  methods: {
    searchChang(data) {
      this.search = data
      this.getList()
    },
    getList() {
      getData(Object.assign(this.listQuery, this.search)).then(res => {
        this.list = res.data.list
        this.count = res.data.count
        this.listQuery.pageNo = res.data.pageNo
        this.listQuery.pageSize = res.data.pageSize
        this.listLoading = false
      })
    }
  }
}
</script>
