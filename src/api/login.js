import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/ips/a/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/ips/a/info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/ips/a/logout',
    method: 'post'
  })
}
