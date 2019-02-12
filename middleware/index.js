/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-02-12 16:58:07
 * @description: 中间件实例处理
 */
'use strict'

const context = require('../model/context')
const request = require('../model/request')
const response = require('../model/response')
const errorParser = require('../handle/error-parser')
const bodyParser = require('../handle')

class Middleware {
  constructor() {
    this.middlewareQueue = []
    this.context = context
    this.request = request
    this.response = response
    this.orcParm = null
  }

  /**
   * 添加中间件挂载
   * @param {Function} middleware  中间件函数
   */
  add(middleware) {
    this.middlewareQueue.push(middleware)
  }

  /**
   * 中间件队列组成
   * @return {Function} Promise对象
   */
  handleMiddleware() {
    return async ctx => {
      // 闭包循环
      function createNext(middleware, oldNext) {
        return async () => {
          await middleware(ctx, oldNext)
        }
      }

      const { length } = this.middlewareQueue
      let next = async () => {
        return Promise.resolve()
      }
      for (let i = length - 1; i >= 0; i--) {
        let currMiddleware = this.middlewareQueue[i]
        next = createNext(currMiddleware, next)
      }

      await next()
    }
  }

  /**
   * http.createServer 的callback匿名函数
   * @return {Function} fn
   */
  handlerInstance(orcObj) {
    return (req, res) => {
      const ctx = this.createCtx(req, res)
      const bodyParserFn = () => bodyParser(orcObj, ctx)
      const errorFn = err => errorParser(orcObj, ctx, err)
      return this.handleMiddleware()(ctx)
        .then(bodyParserFn)
        .catch(errorFn)
    }
  }

  /**
   * 构造ctx 实例
   * @param {Object} req node req实例
   * @param {Object} res node res实例
   * @return {Object} ctx实例
   */
  createCtx(req, res) {
    const ctx = Object.create(this.context)
    ctx.request = Object.create(this.request)
    ctx.response = Object.create(this.response)
    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }
}

module.exports = new Middleware()
