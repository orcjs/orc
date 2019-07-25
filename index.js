/*
 * @Author: 余树
 * @Date: 2019-07-24 14:48:40
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:36:05
 */
'use strict'

const METHODS = ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
const Eventemitter = require('eventemitter3')
const server = require('./manage/server')
const errorParser = require('./handle/error-parser')

class Orc extends Eventemitter {
  /**
   * 初始化参数
   * @param {Array} routerList [路由列表]
   * @param {object} conf [路由配置]
   * @param {object} req [request对象]
   * @param {object} res [response对象]
   */
  constructor(conf) {
    super()
    const port = conf.port || 3000
    this.routerList = []
    this.conf = conf || {}
    this.req = {}
    this.res = {}
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
      Orc.prototype[x.toLowerCase()] = Orc.prototype[x.toLowerCase()] = function(path, content) {
        this.routerList.push({ path, content })
      }
    })

    // 监听捕获报错
    this.on('error', errConf => {
      errorParser.call(this, errConf)
    })
  }
}

module.exports = Orc
