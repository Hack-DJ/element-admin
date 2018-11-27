import request from '@/utils/request'

const Model = ''
const linkUrl = function(name) {
  return `${Model}${name}`
}

export function login(username, password) {
  return request({
    url: linkUrl('login'),
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: linkUrl('info'),
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: linkUrl('logout'),
    method: 'post'
  })
}
