const METHODS = ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']

class Router {
  constructor() {
    this.stack = []
  }

  /**
   * 为每一个http方法注册一个函数对象
   * @param {String} path url
   * @param {String} methods 请求方法
   * @param {Function} middleware  Promise对象
   */
  register(path, methods, middleware) {
    this.stack.push({ path, methods, middleware })
    return this
  }

  handle() {
    const stock = this.stack
    return async (ctx, next) => {
      const { path } = ctx.url
      const { method } = ctx.req
      let route

      for (let i = 0; i < stock.length; i++) {
        let item = stock[i]
        if (path === item.path && item.methods.indexOf(method) > -1) {
          route = item.middleware
          break
        }
      }

      if (typeof route === 'function') {
        route(ctx, next)
        return
      }

      await next()
    }
  }
}

// 对methods 注册一个函数
METHODS.forEach(item => {
  Router.prototype[item.toLowerCase()] = Router.prototype[item] = function(path, middleware) {
    this.register(path, [item], middleware)
  }
})

module.exports = Router
