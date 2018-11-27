'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '" http://192.168.206.102:7300/mock/5bed2f53d290df0916e583c2/tensquare"',
})
