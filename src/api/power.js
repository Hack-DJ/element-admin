import request from '@/utils/request'

const Model = '/sys/menu'
const linkUrl = function(name) {
  return `${Model}/${name}`
}

export function getPermission() {
  // return new Promise(resolve => {
  //   const res = {
  //     'ret': 0,
  //     'msg': '',
  //     'data': {
  //       'list': [
  //         { 'id': '27', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,', 'name': '系统管理', 'icon': 'nested', 'sort': 100, 'isShow': '1', 'parentId': '1' },
  //         { 'id': '28', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,27,', 'name': '菜单管理', 'href': '/cms/article/', 'icon': 'nested', 'sort': 30, 'isShow': '1', 'parentId': '27' },
  //         { 'id': '71', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,27,', 'name': '角色管理', 'href': '/cms/article/', 'icon': 'nested', 'sort': 90, 'isShow': '1', 'parentId': '27' },
  //         { 'id': '29', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,27,', 'name': '用户管理', 'href': '/cms/article/', 'icon': 'nested', 'sort': 90, 'isShow': '1', 'parentId': '27' },
  //         { 'id': '30', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,27,', 'name': '系统字典', 'href': '/cms/article/', 'icon': 'nested', 'sort': 90, 'isShow': '1', 'parentId': '27' },
  //         { 'id': '26', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,27,', 'name': '图标管理', 'href': '/cms/article/', 'icon': 'nested', 'sort': 90, 'isShow': '1', 'parentId': '27' },
  //         { 'id': '62', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,', 'name': '数据源管理', 'icon': 'nested', 'sort': 200, 'isShow': '1', 'parentId': '1' },
  //         { 'id': '88', 'isNewRecord': false, 'createDate': '2013-11-08 08:00:00', 'updateDate': '2013-11-08 08:00:00', 'parentIds': '0,1,62,', 'name': '网站类型', 'href': '', 'target': '', 'icon': 'nested', 'sort': 20, 'isShow': '1', 'permission': '', 'parentId': '62' },
  //         { 'id': '89', 'isNewRecord': false, 'createDate': '2013-11-08 08:00:00', 'updateDate': '2013-11-08 08:00:00', 'parentIds': '0,1,62,', 'name': '网站信息', 'href': '/oa/oaNotify/self', 'target': '', 'icon': 'nested', 'sort': 30, 'isShow': '1', 'permission': '', 'parentId': '62' },
  //         { 'id': '90', 'isNewRecord': false, 'createDate': '2013-11-08 08:00:00', 'updateDate': '2013-11-08 08:00:00', 'parentIds': '0,1,62,', 'name': '采集策略', 'href': '/oa/oaNotify', 'target': '', 'icon': 'nested', 'sort': 50, 'isShow': '1', 'permission': 'oa:oaNotify:view,oa:oaNotify:edit', 'parentId': '62' },
  //         { 'id': '63', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,62,', 'name': '采集数据', 'href': '/cms/article/', 'icon': 'nested', 'sort': 30, 'isShow': '1', 'parentId': '62' },
  //         { 'id': '31', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,', 'name': '存储管理', 'icon': 'nested', 'sort': 500, 'isShow': '1', 'parentId': '1' },
  //         { 'id': '40', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,31,', 'name': '数据库信息', 'icon': 'nested', 'sort': 500, 'isShow': '1', 'permission': 'cms:view', 'parentId': '31' },
  //         { 'id': '41', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,31,', 'name': '数据表信息', 'href': '/cms/', 'icon': 'nested', 'sort': 30, 'isShow': '1', 'parentId': '31' },
  //         { 'id': '42', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,31,', 'name': '采集内容', 'href': '/cms/article/', 'icon': 'nested', 'sort': 40, 'isShow': '0', 'parentId': '31' },
  //         { 'id': '2', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,', 'name': '爬虫管理', 'icon': 'nested', 'sort': 900, 'isShow': '1', 'parentId': '1' },
  //         { 'id': '13', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,2,', 'name': '任务', 'icon': 'nested', 'sort': 970, 'isShow': '1', 'parentId': '2' },
  //         { 'id': '20', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,2,', 'name': '服务', 'href': '/sys/user/index', 'icon': 'nested', 'sort': 30, 'isShow': '1', 'parentId': '2' },
  //         { 'id': '21', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,2,', 'name': '服务的任务', 'icon': 'nested', 'sort': 30, 'isShow': '0', 'permission': 'sys:user:view', 'parentId': '2' },
  //         { 'id': '22', 'isNewRecord': false, 'createDate': '2013-05-27 08:00:00', 'updateDate': '2013-05-27 08:00:00', 'parentIds': '0,1,2,', 'name': '服务治理', 'icon': 'nested', 'sort': 40, 'isShow': '0', 'permission': 'sys:user:edit', 'parentId': '2' },
  //         { 'id': '79', 'isNewRecord': false, 'createDate': '2013-10-16 08:00:00', 'updateDate': '2013-10-16 08:00:00', 'parentIds': '0,1,', 'name': '统计管理', 'icon': 'nested', 'sort': 5000, 'isShow': '1', 'parentId': '1' },
  //         { 'id': '80', 'isNewRecord': false, 'createDate': '2013-10-16 08:00:00', 'updateDate': '2013-10-16 08:00:00', 'parentIds': '0,1,79,', 'name': '查看数据', 'icon': 'nested', 'sort': 50, 'isShow': '1', 'parentId': '79' },
  //         {
  //           'id': '82',
  //           'isNewRecord': false,
  //           'createDate': '2013-10-16 08:00:00',
  //           'updateDate': '2013-10-16 08:00:00',
  //           'parentIds': '0,1,79,',
  //           'name': '操作日志',
  //           'href': '/gen/genTable',
  //           'permission': 'gen:genTable:view,gen:genTable:edit,gen:genTableColumn:view,gen:genTableColumn:edit',
  //           'icon': 'nested',
  //           'sort': 50,
  //           'isShow': '1',
  //           'parentId': '79'
  //         },
  //         {
  //           'id': '83',
  //           'isNewRecord': false,
  //           'createDate': '2013-10-16 08:00:00',
  //           'updateDate': '2013-10-16 08:00:00',
  //           'parentIds': '0,1,79,',
  //           'name': '查看HTML文件',
  //           'href': '/gen/genTable',
  //           'permission': 'gen:genTable:view,gen:genTable:edit,gen:genTableColumn:view,gen:genTableColumn:edit',
  //           'icon': 'nested',
  //           'sort': 50,
  //           'isShow': '1',
  //           'parentId': '79'
  //         },
  //         {
  //           'id': '84',
  //           'isNewRecord': false,
  //           'createDate': '2013-10-16 08:00:00',
  //           'updateDate': '2013-10-16 08:00:00',
  //           'parentIds': '0,1,79,',
  //           'name': '任务数据统计',
  //           'href': '/gen/genTable',
  //           'permission': 'gen:genTable:view,gen:genTable:edit,gen:genTableColumn:view,gen:genTableColumn:edit',
  //           'icon': 'nested',
  //           'sort': 50,
  //           'isShow': '1',
  //           'parentId': '79'
  //         },
  //         {
  //           'id': '85',
  //           'isNewRecord': false,
  //           'createDate': '2013-10-16 08:00:00',
  //           'updateDate': '2013-10-16 08:00:00',
  //           'parentIds': '0,1,79,',
  //           'name': '配置管理',
  //           'href': '/gen/genTable',
  //           'permission': 'gen:genTable:view,gen:genTable:edit,gen:genTableColumn:view,gen:genTableColumn:edit',
  //           'icon': 'nested',
  //           'sort': 50,
  //           'isShow': '1',
  //           'parentId': '79'
  //         }
  //       ]
  //     }
  //   }
  //   resolve(res)
  // })
  return request({
    url: linkUrl('list'),
    method: 'get',
    data: {}
  })
}

export function savePermission(form) {
  // return new Promise(resolve => {
  //   const res = {
  //     'ret': 0,
  //     'msg': '',
  //     'data': {}
  //   }
  //   resolve(res)
  // })

  return request({
    url: linkUrl('save'),
    method: 'post',
    data: form
  })
}

export function getRoleList(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/sys/menu/role',
    method: 'get',
    params
  })
}

export function getUserList(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/sys/menu/userlist',
    method: 'get',
    params
  })
}

export function getDictList(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/sys/dict/list',
    method: 'get',
    params
  })
}
