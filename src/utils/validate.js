/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 手机号*/
export function validatePhone(val) {
  return /^[0-9]{11}$/.test(val)
}

/** 数据是否为空 **/
export function validateEmpty(data) {
  if (!data) return false
  if (typeof data === 'string') {
    return data.length > 0 && data !== '' && data !== null
  } else if (typeof data === 'object') {
    return Object.keys(data).length > 0
  } else if (typeof data === 'number') {
    return data > 0
  } else {
    return !!data
  }
}

/** 验证对象数据是否有id **/
export function validateObjectId(rule, value, callback) {
  if (!validateEmpty(value.id)) {
    callback(new Error('error'))
  } else {
    callback()
  }
}
