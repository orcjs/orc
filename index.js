/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-02-15 11:31:58
 * @description: Orc实例
 */
'use strict'

const EventEmitter = require('events')
const http = require('http')
const middleware = require('./middleware')

class Orc extends EventEmitter {
  /**
   * 初始化参数
   * @param {object} obj 端口号 && 路由配置
   */
  constructor(obj) {
    super(obj)
    this.orcProto = obj
    this.listen()
  }

  // 端口
  listen() {
    const { orcProto } = this
    const port = (orcProto && orcProto.port) || 3000

    http.createServer(middleware.handlerInstance(this)).listen(port)
    console.log(`- Local: http://localhost:${port}`)
  }

  /**
   * 分发到 middleware类下
   * @param {Function} middleware  中间件函数
   */
  use(data) {
    middleware.add(data)
  }
}

module.exports = Orc
