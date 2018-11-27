import request from '@/utils/request'

const Model = '/power'
const linkUrl = function(name) {
  return `${Model}/${name}`
}

export function getPermission(username, password) {
  return request({
    url: linkUrl('permission'),
    method: 'get',
    data: {}
  })
}
