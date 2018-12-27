import request from '@/utils/request'

export function getSysDict(params) {
  return request({
    url: '/sys/dict/listData',
    method: 'get',
    params
  })
}
