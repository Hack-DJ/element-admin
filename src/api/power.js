import request from '@/utils/request'

export function getPermission() {
  return request({
    url: '/ips/a/sys/menu/list',
    method: 'get',
    data: {}
  })
}

export function savePermission(form) {
  return request({
    url: '/ips/a/sys/menu/save',
    method: 'post',
    data: form
  })
}

export function deletePermission(id) {
  return request({
    url: '/ips/a/sys/menu/delete',
    method: 'post',
    data: id
  })
}

export function getRoleList(params) {
  return request({
    url: '/ips/a/sys/role/list',
    method: 'get',
    params
  })
}

export function getUserList(params) {
  return request({
    url: '/ips/a/sys/user/list',
    method: 'get',
    params
  })
}

export function getDictList(params) {
  return request({
    url: '/ips/a/sys/dict/list',
    method: 'get',
    params
  })
}
