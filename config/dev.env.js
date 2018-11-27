'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://10.154.55.3:8000/ips/a"',
  // BASE_API: '"http://code2012.cn/rapServer/app/mock/18"',
  index_name: '"仪表盘"'
})
