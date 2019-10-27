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
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
      res.setHeader('X-powered-by', 'orcjs')
      handleParser.call(this, req, res)
    })
    .listen(port)

  console.log(`- Local: http://localhost:${port}`)
}

module.exports = server
