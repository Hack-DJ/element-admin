import request from '@/utils/request'

const linkUrl = function(name) {
  return `/power/${name}`
}

export function getPermission(username, password) {
  return request({
    url: linkUrl('permission'),
    method: 'get',
    data: {}
  })
}
