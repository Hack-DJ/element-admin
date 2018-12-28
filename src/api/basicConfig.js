import request from '@/utils/request'

export function getSysDict(params) {
  return request({
    url: '/ips/a/sys/dict/listData',
    method: 'get',
    params
  })
}

export function getConfig(params) {
  return request({
    url: '/ips/config/getConfig',
    method: 'get',
    params
  })
}
