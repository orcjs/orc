/*
 * @Author: 余树
 * @Date: 2019-07-24 15:09:51
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:41:44
 * @description: 启动服务
 */
'use strict'

const http = require('http')
const handleParser = require('../handle/index')

/**
 * @param {Number} port [端口号]
 */
function server(port) {
  http
    .createServer((req, res) => {
      this.req = req
      this.res = res
      handleParser.call(this, req, res)
    })
    .listen(port)

  console.log(`- Local: http://localhost:${port}`)
}

module.exports = server
