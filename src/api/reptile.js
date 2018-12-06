import request from '@/utils/request'

// const Model = '/sys/menu'
// const linkUrl = function(name) {
//   return `${Model}/${name}`
// }

export function getTask(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/reptile/task',
    method: 'get',
    params
  })
}

export function getServiceTask(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/reptile/servicetask',
    method: 'get',
    params
  })
}

export function getGovern(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/reptile/govern',
    method: 'get',
    params
  })
}

export function getService(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/reptile/service',
    method: 'get',
    params
  })
}
