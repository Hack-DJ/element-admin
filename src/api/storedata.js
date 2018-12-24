import request from '@/utils/request'

// const Model = '/sys/menu'
// const linkUrl = function(name) {
//   return `${Model}/${name}`
// }

export function getLibrary(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/storedata/library',
    method: 'get',
    params
  })
}

export function getTable(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/storedata/table',
    method: 'get',
    params
  })
}

export function getData(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/storedata/data',
    method: 'get',
    params
  })
}

export function databaseForm(data = {}) {
  return Object.assign({
    itemList: [
      {
        label: '数据库名',
        type: 'input',
        placeholder: '请输入数据库名',
        prop: 'database_name'
      },
      {
        label: '数据库地址',
        type: 'input',
        placeholder: '请输入数据库URL或IP地址',
        prop: 'database_url'
      },
      {
        label: '端口',
        type: 'input',
        placeholder: '请输入数据库端口',
        prop: 'database_port'
      },
      {
        label: '用户名',
        type: 'input',
        placeholder: '请输入数据库登录用户名',
        prop: 'login_user'
      },
      {
        label: '密码',
        type: 'input',
        placeholder: '请输入数据库登录密码',
        prop: 'login_psw'
      },
      {
        label: '备注',
        type: 'input',
        inputType: 'textarea',
        placeholder: '请输入数据库备注',
        prop: 'remarks'
      }
    ],
    ruleForm: { 'id': '', 'database_name': '', 'database_url': '', 'database_port': '', 'login_user': '', 'login_psw': '', 'remarks': '' },
    rules: {
      database_name: [
        { required: true, message: '请输入数据库名称', trigger: 'blur' }
      ],
      database_url: [
        { required: true, message: '请输入数据库地址', trigger: 'blur' }
      ],
      database_port: [
        { required: true, message: '请输入数据库端口', trigger: 'blur' }
      ],
      login_user: [
        { required: true, message: '请输入数据库登录用户名', trigger: 'blur' }
      ],
      login_psw: [
        { required: true, message: '请输入数据库登录密码', trigger: 'blur' }
      ]
    },
    saveUrl: 'http://save.com'
  }, data)
}

export function tableForm(data = {}) {
  return Object.assign({
    itemList: [
      {
        label: '数据库',
        type: 'parent',
        inputType: 'list',
        placeholder: '请选择数据库',
        prop: 'database_id',
        name: 'database_name',
        listUrl: 'http://code2012.cn/rapServer/app/mock/18/storedata/library',
        pageName: '选择网站数据库',
        parentCloumnsList: [
          {
            text: '名称',
            value: 'database_name'
          },
          {
            text: '地址',
            value: 'database_url'
          },
          {
            text: '端口',
            value: 'database_port'
          },
          {
            text: '用户名',
            value: 'login_user'
          },
          {
            text: '密码',
            value: 'login_psw'
          },
          {
            text: '备注',
            value: 'remarks'
          }
        ],
        parentSearchCriteria: []
      },
      {
        label: '表名',
        type: 'input',
        placeholder: '请输入表名',
        prop: 'table_name'
      },
      {
        label: '表类型',
        type: 'input',
        placeholder: '请输入表类型',
        prop: 'table_type'
      },
      {
        label: '表code',
        type: 'input',
        placeholder: '请输入表code',
        prop: 'table_code'
      },
      {
        label: '备注',
        type: 'input',
        inputType: 'textarea',
        placeholder: '请输入备注',
        prop: 'remarks'
      }
    ],
    ruleForm: {
      database_id: '',
      remarks: '',
      id: '',
      table_code: '',
      table_name: '',
      table_type: ''
    },
    rules: {
      database_id: [
        { required: true, message: '请选择数据库', trigger: 'blur' }
      ],
      table_name: [
        { required: true, message: '请输入表名', trigger: 'blur' }
      ],
      table_type: [
        { required: true, message: '请输入表类型', trigger: 'blur' }
      ],
      table_code: [
        { required: true, message: '请输入表code', trigger: 'blur' }
      ]
    },
    saveUrl: 'http://save.com'
  }, data)
}

export function fieldForm(data = {}) {
  return Object.assign({
    itemList: [
      {
        label: '数据库表',
        type: 'parent',
        inputType: 'list',
        placeholder: '请选择数据表',
        prop: 'collect_table_id',
        name: 'table_name',
        listUrl: 'http://code2012.cn/rapServer/app/mock/18/storedata/table',
        pageName: '数据表',
        parentCloumnsList: [
          {
            text: '数据库',
            value: 'database_id_des'
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
        ]
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
        label: '修改字段',
        type: 'select',
        placeholder: '是否修改数据字段',
        optionList: [{ label: '是', value: '0' }, { label: '否', value: '1' }],
        prop: 'is_update'
      },
      {
        label: '采集子表主键',
        type: 'parent',
        inputType: 'select',
        placeholder: '采集子表主键',
        prop: 'slave_collect_table_id',
        name: 'table_name',
        listUrl: 'http://code2012.cn/rapServer/app/mock/18/storedata/table',
        pageName: '数据表',
        parentCloumnsList: [
          {
            text: '数据库',
            value: 'database_id_des'
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
        ]
      }
    ],
    ruleForm: {
      collect_table_id: '',
      field_code: '',
      field_length: '',
      field_name: '',
      id: '',
      is_update: '',
      slave_collect_table_id: []
    },
    rules: {
      tableId: [
        { required: true, message: '请选择数据库表', trigger: 'blur' }
      ],
      name: [
        { required: true, message: '请输入内容名', trigger: 'blur' }
      ]
    },
    saveUrl: 'http://save.com'
  }, data)
}

