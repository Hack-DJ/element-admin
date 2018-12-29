import request from '@/utils/request'

export function getSysDict(params) {
  return request({
    url: '/ips/a/sys/dict/listData',
    method: 'get',
    params
  })
}

export function getConfig(url = '/ips/config/getConfig') {
  return request({
    url: url,
    method: 'get'
  })
}
