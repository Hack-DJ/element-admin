import request from '@/utils/request'

// const Model = '/sys/menu'
// const linkUrl = function(name) {
//   return `${Model}/${name}`
// }

export function getType(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/datasource/type',
    method: 'get',
    params
  })
}

export function getInfo(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/datasource/info',
    method: 'get',
    params
  })
}

export function getStrategy(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/datasource/strategy',
    method: 'get',
    params
  })
}

export function getList(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/datasource/list',
    method: 'get',
    params
  })
}
