import request from '@/utils/request'

export function getPermission() {
  return request({
    url: '/sys/menu/list',
    method: 'get',
    data: {}
  })
}

export function savePermission(form) {
  return request({
    url: '/sys/menu/save',
    method: 'post',
    data: form
  })
}

export function deletePermission(id) {
  return request({
    url: '/sys/menu/delete',
    method: 'post',
    data: id
  })
}

export function getRoleList(params) {
  return request({
    url: '/sys/role/list',
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
