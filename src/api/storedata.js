import request from '@/utils/request'

// const Model = '/sys/menu'
// const linkUrl = function(name) {
//   return `${Model}/${name}`
// }

export function getLibrary(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/storedata/library',
    method: 'get',
    params
  })
}

export function getTable(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/storedata/table',
    method: 'get',
    params
  })
}

export function getData(params) {
  return request({
    url: 'http://code2012.cn/rapServer/app/mock/18/storedata/data',
    method: 'get',
    params
  })
}

