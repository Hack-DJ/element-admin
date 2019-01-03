import request from '@/utils/request'

// 读取数据字典
export function getSysDict(params) {
  return request({
    url: '/ips/a/sys/dict/listData',
    method: 'get',
    params
  })
}

// 读取页面配置
export function getConfig(url = '/ips/config/getConfig') {
  return request({
    url: url,
    method: 'get'
  })
}

// 提交form表单
export function requestForm(url, form) {
  return request({
    url: url,
    method: 'post',
    data: form
  })
}

// 请求列表
export function getList(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
