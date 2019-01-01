import request from '@/utils/request'

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

export function getStoreTree() {
  return new Promise(resolve => {
    const res = {
      ret: 0,
      msg: '',
      data: {
        list: [{
          'id': 1,
          'database_url': '205.215.193.232',
          'database_port': 4245,
          'database_name': 'POI类',
          'login_user': 'Walker',
          'login_psw': 'Garcia',
          'remarks': 'cX4O2!h^Ue]^1Uf@',
          'name': 'POI类',
          'parentId': '-1',
          'parentIds': '-1'
        }, {
          'id': 2,
          'database_url': '12.35.46.72',
          'database_port': 4372,
          'database_name': '房屋信息类',
          'login_user': 'White',
          'login_psw': 'Thomas',
          'remarks': 'DA45DCx8BnZtGzzJ',
          'name': '房屋信息类',
          'parentId': '-1',
          'parentIds': '-1'
        }, {
          'id': 3,
          'database_url': '239.198.193.187',
          'database_port': 4407,
          'database_name': '团购外卖类',
          'login_user': 'Robinson',
          'login_psw': 'White',
          'remarks': 's1bMwTy7y^4P(bNS',
          'name': '团购外卖类',
          'parentId': '-1',
          'parentIds': '-1'
        }, {
          'id': 4,
          'database_url': '61.122.112.8',
          'database_port': 4537,
          'database_name': '旅游类',
          'login_user': 'White',
          'login_psw': 'Gonzalez',
          'remarks': 'N7x@T03sKE58tY)D',
          'name': '旅游类',
          'parentId': '-1',
          'parentIds': '-1'
        }, {
          'id': 5,
          'database_id': 2,
          'table_name': '房天下',
          'table_type': 'Sandra',
          'table_code': '0#Of75',
          'remarks': 'HTpZt9yZZ*UX5Tw@',
          'database_id_des': 'POI类',
          'parentId': 3,
          'parentName': '房屋信息类',
          'parentIds': '-1,3',
          'name': '大众点评'
        }, {
          'id': 6,
          'database_id': 3,
          'table_name': '百姓网',
          'table_type': 'Shirley',
          'table_code': '@%r$X5',
          'remarks': 'cvvmqrb$L7bQtUEL',
          'database_id_des': '旅游类',
          'parentId': 2,
          'parentName': '房屋信息类',
          'parentIds': '-1,4',
          'name': '携程'
        }, {
          'id': 7,
          'database_id': 1,
          'table_name': '赶集网',
          'table_type': 'Laura',
          'table_code': 'DNGlXT',
          'remarks': '35CBS5b%Cx949$ej',
          'database_id_des': 'POI类',
          'parentId': 3,
          'parentName': '房屋信息类',
          'parentIds': '-1,2',
          'name': '大众点评'
        }, {
          'id': 8,
          'database_id': 3,
          'table_name': '58同城',
          'table_type': 'David',
          'table_code': 't[KELb',
          'remarks': 'TsAfULSj@cXX1ifB',
          'database_id_des': '团购外卖类',
          'parentId': 2,
          'parentName': '房屋信息类',
          'parentIds': '-1,1',
          'name': '58同城'
        }, {
          'id': 9,
          'database_id': 1,
          'table_name': '安居客',
          'table_type': 'Jennifer',
          'table_code': 'XsE(pg',
          'remarks': '95#T!!K4]R^7H[EE',
          'database_id_des': 'POI类',
          'parentId': 4,
          'parentName': '团购外卖类',
          'parentIds': '-1,2',
          'name': '东方财富网'
        }, {
          'id': 10,
          'database_id': 1,
          'table_name': '京东',
          'table_type': 'Donna',
          'table_code': 'pf6(d*',
          'remarks': 'g(15jjTm&hvLSst#',
          'database_id_des': '房屋信息类',
          'parentId': 2,
          'parentName': '旅游类',
          'parentIds': '-1,3',
          'name': '赶集网'
        }, {
          'id': 11,
          'database_id': 3,
          'table_name': '天猫',
          'table_type': 'Frank',
          'table_code': 'j*1MSn',
          'remarks': '#dwp7bEdFW)f4!g3',
          'database_id_des': '旅游类',
          'parentId': 3,
          'parentName': '房屋信息类',
          'parentIds': '-1,3',
          'name': '安居客'
        }, {
          'id': 12,
          'database_id': 1,
          'table_name': '淘宝',
          'table_type': 'Anna',
          'table_code': 'BeB!df',
          'remarks': 'U!qWW#DfeCXVvZKq',
          'database_id_des': '团购外卖类',
          'parentId': 2,
          'parentName': '旅游类',
          'parentIds': '-1,1',
          'name': '大众点评'
        }, {
          'id': 13,
          'database_id': 2,
          'table_name': 'Amazon',
          'table_type': 'Daniel',
          'table_code': 'OMFx4*',
          'remarks': 'p^V(R&xtGwr@a&Qm',
          'database_id_des': 'POI类',
          'parentId': 1,
          'parentName': '团购外卖类',
          'parentIds': '-1,1',
          'name': '黄页88'
        }, {
          'id': 14,
          'database_id': 4,
          'table_name': '阿里巴巴',
          'table_type': 'Brenda',
          'table_code': 'gG&nle',
          'remarks': 'Q(wMxv2(x$UJaC0l',
          'database_id_des': '团购外卖类',
          'parentId': 4,
          'parentName': '团购外卖类',
          'parentIds': '-1,2',
          'name': '百度'
        }, {
          'id': 15,
          'database_id': 1,
          'table_name': '114黄页',
          'table_type': 'Kevin',
          'table_code': '8GthNX',
          'remarks': '0p&Rz9i)^K0jK#f*',
          'database_id_des': '团购外卖类',
          'parentId': 2,
          'parentName': '房屋信息类',
          'parentIds': '-1,4',
          'name': '豆瓣'
        }, {
          'id': 16,
          'database_id': 3,
          'table_name': '微博网页',
          'table_type': 'Joseph',
          'table_code': '&EZ(y@',
          'remarks': '2GEhqt(iA%()Vg6q',
          'database_id_des': 'POI类',
          'parentId': 4,
          'parentName': '房屋信息类',
          'parentIds': '-1,2',
          'name': '58同城'
        }, {
          'id': 17,
          'database_id': 3,
          'table_name': '东方财富网',
          'table_type': 'Christopher',
          'table_code': '0PU4f1',
          'remarks': '3O02lSj4k&&bOR&3',
          'database_id_des': '团购外卖类',
          'parentId': 2,
          'parentName': '团购外卖类',
          'parentIds': '-1,1',
          'name': '58同城'
        }, {
          'id': 18,
          'database_id': 4,
          'table_name': '今日头条',
          'table_type': 'Karen',
          'table_code': 'Iy@Db6',
          'remarks': '6uwYv4bPlrzooyn7',
          'database_id_des': '旅游类',
          'parentId': 3,
          'parentName': '旅游类',
          'parentIds': '-1,3',
          'name': '哔哩哔哩(B站)'
        }, {
          'id': 19,
          'database_id': 3,
          'table_name': '哔哩哔哩(B站)',
          'table_type': 'Sarah',
          'table_code': 'Lx7VLA',
          'remarks': 'kUd*O^**I00s%77L',
          'database_id_des': '团购外卖类',
          'parentId': 4,
          'parentName': 'POI类',
          'parentIds': '-1,2',
          'name': '赶集网'
        }, {
          'id': 20,
          'database_id': 4,
          'table_name': '搜狗',
          'table_type': 'Steven',
          'table_code': 'GX@8$u',
          'remarks': 'r(1wZsB[B#Pm%OrG',
          'database_id_des': '房屋信息类',
          'parentId': 4,
          'parentName': '房屋信息类',
          'parentIds': '-1,1',
          'name': '美团'
        }, {
          'id': 21,
          'database_id': 3,
          'table_name': '百度',
          'table_type': 'Mark',
          'table_code': '!!ujK#',
          'remarks': 'OsVWDTzNZ$L8kp9l',
          'database_id_des': '旅游类',
          'parentId': 2,
          'parentName': '团购外卖类',
          'parentIds': '-1,3',
          'name': '今日头条'
        }, {
          'id': 22,
          'database_id': 2,
          'table_name': '豆瓣',
          'table_type': 'Kevin',
          'table_code': 'NYYuX7',
          'remarks': 'BL^4JNeDvcrW$nBs',
          'database_id_des': '房屋信息类',
          'parentId': 3,
          'parentName': '房屋信息类',
          'parentIds': '-1,3',
          'name': '豆瓣'
        }, {
          'id': 23,
          'database_id': 4,
          'table_name': '知网',
          'table_type': 'Elizabeth',
          'table_code': 't6(O8T',
          'remarks': 'b)i[EfT30Dr)henv',
          'database_id_des': '旅游类',
          'parentId': 3,
          'parentName': '团购外卖类',
          'parentIds': '-1,2',
          'name': '赶集网'
        }, {
          'id': 24,
          'database_id': 4,
          'table_name': '大众点评',
          'table_type': 'Jessica',
          'table_code': 'pw]WB6',
          'remarks': 'w#!*OK(oX2AC$fIV',
          'database_id_des': '团购外卖类',
          'parentId': 2,
          'parentName': '团购外卖类',
          'parentIds': '-1,2',
          'name': '阿里巴巴'
        }, {
          'id': 26,
          'collect_table_id': 11,
          'field_name': '反万知光',
          'field_code': 'Laura',
          'field_length': 10,
          'is_update': 0,
          'slave_collect_table_id': '14B26EfC-08C4-15F3-dDFE-aBawfC911B12',
          'collect_table_id_des': '驴妈妈旅游',
          'parentId': 10,
          'parentName': '房天下',
          'parentIds': '-1,2,12',
          'name': '记感海金深'
        }, {
          'id': 27,
          'collect_table_id': 8,
          'field_name': '要况住化只',
          'field_code': 'Thomas',
          'field_length': 25,
          'is_update': 1,
          'slave_collect_table_id': '14B26EfC-08C4-15F3-dDFE-aBawfC911B12',
          'collect_table_id_des': '114黄页',
          'parentId': 18,
          'parentName': '黄页88',
          'parentIds': '-1,3,7',
          'name': '员族指位'
        }, {
          'id': 28,
          'collect_table_id': 10,
          'field_name': '划月才节',
          'field_code': 'Robert',
          'field_length': 145,
          'is_update': 0,
          'slave_collect_table_id': '9dfbCf66-6fd3-8db9-dB23-5C23e13fb73d',
          'collect_table_id_des': '安居客',
          'parentId': 10,
          'parentName': '豆瓣',
          'parentIds': '-1,3,20',
          'name': '着月史专义'
        }, {
          'id': 29,
          'collect_table_id': 11,
          'field_name': '速家结红',
          'field_code': 'Frank',
          'field_length': 226,
          'is_update': 0,
          'slave_collect_table_id': '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD',
          'collect_table_id_des': '大众点评',
          'parentId': 15,
          'parentName': '京东',
          'parentIds': '-1,2,15',
          'name': '打只清书观我'
        }, {
          'id': 30,
          'collect_table_id': 10,
          'field_name': '东军解除群难院',
          'field_code': 'Frank',
          'field_length': 246,
          'is_update': 1,
          'slave_collect_table_id': '14B26EfC-08C4-15F3-dDFE-aBaefC911B16',
          'collect_table_id_des': '百度',
          'parentId': 19,
          'parentName': '赶集网',
          'parentIds': '-1,1,17',
          'name': '数被育生'
        }, {
          'id': 31,
          'collect_table_id': 9,
          'field_name': '段较张则间',
          'field_code': 'Larry',
          'field_length': 127,
          'is_update': 0,
          'slave_collect_table_id': '14B26EfC-08C4-15F3-dDFE-aBaefC911B16',
          'collect_table_id_des': '搜狗',
          'parentId': 6,
          'parentName': '房天下',
          'parentIds': '-1,2,17',
          'name': '造利权度京上'
        }, {
          'id': 32,
          'collect_table_id': 19,
          'field_name': '油军什必精',
          'field_code': 'Susan',
          'field_length': 192,
          'is_update': 0,
          'slave_collect_table_id': '14B26EfC-08C4-15F3-dcFE-aBbefC911B12',
          'collect_table_id_des': '美团',
          'parentId': 6,
          'parentName': '美团',
          'parentIds': '-1,3,5',
          'name': '于片面世料区'
        }, {
          'id': 33,
          'collect_table_id': 9,
          'field_name': '红好就',
          'field_code': 'Melissa',
          'field_length': 78,
          'is_update': 0,
          'slave_collect_table_id': '14B26EfC-08C4-15F3-dcFE-aBbefC911B12',
          'collect_table_id_des': '赶集网',
          'parentId': 19,
          'parentName': '哔哩哔哩(B站)',
          'parentIds': '-1,1,14',
          'name': '个又支才入回律'
        }, {
          'id': 34,
          'collect_table_id': 13,
          'field_name': '这时所自',
          'field_code': 'Matthew',
          'field_length': 148,
          'is_update': 1,
          'slave_collect_table_id': '14B26EfC-08C4-15F3-dDFE-aBaefC911B16',
          'collect_table_id_des': '58同城',
          'parentId': 12,
          'parentName': '58同城',
          'parentIds': '-1,4,15',
          'name': '素府五建完必'
        }, {
          'id': 35,
          'collect_table_id': 7,
          'field_name': '现所北公研干',
          'field_code': 'Jose',
          'field_length': 149,
          'is_update': 0,
          'slave_collect_table_id': '14B26EfC-08C4-15F3-dcFE-aBbefC911B12',
          'collect_table_id_des': '京东',
          'parentId': 6,
          'parentName': '搜狗',
          'parentIds': '-1,4,14',
          'name': '再管表矿较严去'
        }, {
          'id': 36,
          'collect_table_id': 6,
          'field_name': '备院不',
          'field_code': 'Richard',
          'field_length': 106,
          'is_update': 1,
          'slave_collect_table_id': '14B26EfC-08C4-15F3-dcFE-aBbefC911B12',
          'collect_table_id_des': '搜狗',
          'parentId': 8,
          'parentName': '携程',
          'parentIds': '-1,1,11',
          'name': '器满更数层'
        }, {
          'id': 37,
          'collect_table_id': 17,
          'field_name': '铁王气越',
          'field_code': 'Kevin',
          'field_length': 165,
          'is_update': 1,
          'slave_collect_table_id': '14B26EfC-08C4-15F3-dD2E-aBdefC911B11',
          'collect_table_id_des': '114黄页',
          'parentId': 18,
          'parentName': 'Amazon',
          'parentIds': '-1,3,18',
          'name': '外记她已马平许'
        }, {
          'id': 38,
          'collect_table_id': 18,
          'field_name': '行转按机至',
          'field_code': 'Gary',
          'field_length': 213,
          'is_update': 0,
          'slave_collect_table_id': '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD',
          'collect_table_id_des': '知网',
          'parentId': 12,
          'parentName': '安居客',
          'parentIds': '-1,1,8',
          'name': '习传战部连'
        }, {
          'id': 39,
          'collect_table_id': 17,
          'field_name': '反步走',
          'field_code': 'Thomas',
          'field_length': 69,
          'is_update': 1,
          'slave_collect_table_id': '14B26EfC-08C4-15F3-dDFE-aBaefC911B16',
          'collect_table_id_des': '东方财富网',
          'parentId': 6,
          'parentName': '百姓网',
          'parentIds': '-1,3,13',
          'name': '事派毛'
        }, {
          'id': 40,
          'collect_table_id': 10,
          'field_name': '号素阶果论集亲',
          'field_code': 'Brian',
          'field_length': 142,
          'is_update': 0,
          'slave_collect_table_id': '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD',
          'collect_table_id_des': '天猫',
          'parentId': 9,
          'parentName': '58同城',
          'parentIds': '-1,2,7',
          'name': '不安二得速真非'
        }, {
          'id': 41,
          'collect_table_id': 11,
          'field_name': '什基四质',
          'field_code': 'Matthew',
          'field_length': 178,
          'is_update': 1,
          'slave_collect_table_id': '14B26EfC-08C4-15F3-dDFE-aBawfC911B12',
          'collect_table_id_des': '哔哩哔哩(B站)',
          'parentId': 8,
          'parentName': 'Amazon',
          'parentIds': '-1,2,10',
          'name': '战第山育'
        }, {
          'id': 42,
          'collect_table_id': 14,
          'field_name': '世六参明市集',
          'field_code': 'Thomas',
          'field_length': 145,
          'is_update': 1,
          'slave_collect_table_id': '14B26EfC-08C4-15F3-dDFE-aBawfC911B12',
          'collect_table_id_des': '大众点评',
          'parentId': 7,
          'parentName': '阿里巴巴',
          'parentIds': '-1,2,10',
          'name': '数任走'
        }, {
          'id': 43,
          'collect_table_id': 11,
          'field_name': '全更组东二易',
          'field_code': 'Sarah',
          'field_length': 191,
          'is_update': 1,
          'slave_collect_table_id': '14B26EfC-08C4-15F3-dD2E-aBdefC911B11',
          'collect_table_id_des': '哔哩哔哩(B站)',
          'parentId': 10,
          'parentName': '房天下',
          'parentIds': '-1,1,10',
          'name': '属整战相'
        }, {
          'id': 44,
          'collect_table_id': 8,
          'field_name': '只命格思便',
          'field_code': 'Jeffrey',
          'field_length': 129,
          'is_update': 1,
          'slave_collect_table_id': '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD',
          'collect_table_id_des': '微博网页',
          'parentId': 11,
          'parentName': '东方财富网',
          'parentIds': '-1,4,6',
          'name': '道力全'
        }, {
          'id': 45,
          'collect_table_id': 12,
          'field_name': '越给反至',
          'field_code': 'Laura',
          'field_length': 17,
          'is_update': 1,
          'slave_collect_table_id': '5dcfCFb4-5B56-3CB3-C7aB-Cbb44A5Ff2BD',
          'collect_table_id_des': 'Amazon',
          'parentId': 11,
          'parentName': '安居客',
          'parentIds': '-1,3,20',
          'name': '因最出具报'
        }]
      }
    }
    resolve(res)
  })

  // return axios.all([
  //   request({
  //     url: 'http://code2012.cn/rapServer/app/mock/18/storedata/library',
  //     method: 'get'
  //   }), request({
  //     url: 'http://code2012.cn/rapServer/app/mock/18/storedata/table',
  //     method: 'get'
  //   }), request({
  //     url: 'http://code2012.cn/rapServer/app/mock/18/storedata/data',
  //     method: 'get'
  //   })
  // ])
}

export function databaseForm(data = {}) {
  return Object.assign({
    formTitle: '数据库',
    searchList: [],
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
    columns: [
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
    ruleForm: {
      'id': '',
      'database_name': '',
      'database_url': '',
      'database_port': '',
      'login_user': '',
      'login_psw': '',
      'remarks': ''
    },
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
    listUrl: 'http://code2012.cn/rapServer/app/mock/18/storedata/library',
    deleteUrl: 'http://save.com',
    saveUrl: 'http://save.com'
  }, data)
}

export function tableForm(data = {}) {
  return Object.assign({
    formTitle: '数据表',
    searchList: [
      {
        label: '表名',
        type: 'input',
        key: 'table_name',
        value: null
      },
      {
        label: '类型',
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
    ],
    itemList: [
      {
        label: '数据库',
        type: 'parent',
        inputType: 'list',
        placeholder: '请选择数据库',
        prop: 'database_id',
        name: 'database_name',
        disable: true
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
    columns: [
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
    listUrl: 'http://code2012.cn/rapServer/app/mock/18/storedata/table',
    deleteUrl: 'http://save.com',
    saveUrl: 'http://save.com'
  }, data)
}

export function fieldForm(data = {}) {
  return Object.assign({
    formTitle: '表字段',
    searchList: [
      {
        label: '字段代码',
        type: 'input',
        key: 'field_code'
      },
      {
        label: '字段名',
        type: 'input',
        key: 'field_name'
      }
    ],
    itemList: [
      {
        label: '数据库表',
        type: 'parent',
        inputType: 'list',
        placeholder: '请选择数据表',
        prop: 'collect_table_id',
        name: 'table_name'
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
      }
    ],
    columns: [
      {
        text: '数据库表',
        value: 'collect_table_id_des'
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
    listUrl: 'http://code2012.cn/rapServer/app/mock/18/storedata/data',
    deleteUrl: 'http://save.com',
    saveUrl: 'http://save.com'
  }, data)
}
