/**
 * 模版相关api操作
 * **/

import request from '@/utils/request'

export function getPageData(url, form) {
  return request({
    url: '/ips/a/ips/website/config',
    method: 'post',
    data: form
  })
}
