'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://www.yangkaijun.top:7300/mock/5c00aa08acd81405a809dd91"',
})
