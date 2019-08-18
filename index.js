/*
 * @Author: 余树
 * @Date: 2019-07-24 14:48:40
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:36:05
 */
'use strict'

const METHODS = ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
const server = require('./manage/server')
const handleError = require('./handle/error-parser')

class Orc {
  /**
   * 初始化参数
   * @param {Array} routerList [路由列表]
   * @param {object} conf [实例配置]
   * @param {Function} handleError [处理错误]
   */
  constructor(conf) {
    const port = conf.port || 3000
    this.routerList = []
    this.conf = conf || {}
    this.handleError = handleError
    this.init()
    server.call(this, port)
  }
  /**
   * 自定义路由
   * @param {String} path [路径]
   * @param {string || object } content [内容]
   */
  init() {
    METHODS.forEach(x => {
      Orc.prototype[x.toLowerCase()] = Orc.prototype[x.toLowerCase()] = function (path, content) {
        this.routerList.push({ path, content })
      }
    })
  }
}

module.exports = Orc
