import request from '@/utils/request'

export function requestForm(url, form) {
  return request({
    url: url,
    method: 'post',
    data: form
  })
}
