var merge = require('webpack-merge')
var prodEnv = require('./prod.env')


module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LINK_URL: "'http://h5.test.fxds/fxd-h5/page/faxindai.html'"
})
