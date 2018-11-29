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
