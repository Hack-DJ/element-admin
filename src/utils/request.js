import axios from 'axios'
import qs from 'qs'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

let BASEURL = process.env.BASE_API
if (process.env.NODE_ENV === 'development') {
  BASEURL = 'http://10.154.55.3:8000/ips/a'
  // BASEURL = 'http://code2012.cn/rapServer/app/mock/18'
}
// 取消重复请求
const pending = []
const CancelToken = axios.CancelToken
const removePending = config => {
  for (const p in pending) {
    const item = p
    const list = pending[p]
    if (list.url === config.url + '&request_type=' + config.method) {
      // 执行取消操作
      list.cancel()
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}
const fromDataToString = function(formData) {
  let data = ''
  for (const key in formData) {
    data += '&' + key + '=' + encodeURIComponent(formData[key] instanceof Object
      ? JSON.stringify(formData[key])
      : formData[key])
  }
  return data.substring(1)
}
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: BASEURL, // api 的 base_url
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  responseType: 'json',
  paramsSerializer: function(params) {
    return qs.stringify(params)
  },
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = fromDataToString(config.data)
    }
    if (store.getters.token) {
      config.headers['x-token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    removePending(config)
    config.cancelToken = new CancelToken(c => {
      pending.push({
        url: `${config.url}&request_type=${config.method}`,
        cancel: c
      })
    })
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    console.log(res)
    if (res.ret !== 0) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.ret === 50008 || res.ret === 50012 || res.ret === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
