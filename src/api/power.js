import request from '@/utils/request'

const Model = '/sys/menu'
const linkUrl = function(name) {
  return `${Model}/${name}`
}

export function getPermission() {
  return request({
    url: linkUrl('list'),
    method: 'get',
    data: {}
  })
}

export function savePermission(form) {
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
