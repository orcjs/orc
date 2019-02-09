/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-02-09 21:54:25
 * @description: error解析
 */
'use strict'

class ErrorParser {
  constructor() {}

  /**
   * 错误处理
   * @param {Object} err Error对象
   * @param {Object} ctx ctx实例
   */
  handle(err, ctx) {
    ctx.res.statusCode = 500
    ctx.res.end('system error')
    this.emit('error', err)
  }
}
module.exports = new ErrorParser()
