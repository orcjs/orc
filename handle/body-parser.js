/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-02-09 21:59:15
 * @description: body解析
 */
'use strict'

const path = require('path')
const fs = require('fs')
const renderTpl = require('art-template')
const mineDict = require('../utils/mine')
const getAbsolutePath = (...pathArr) => {
  return path.resolve.apply(path, [process.cwd(), ...pathArr])
}

class BodyParser {
  constructor() {}

  /**
   * 返回前端的数据
   * @param {Object} ctx ctx实例
   */
  handle(ctx) {
    // 若没有配置路由或添加中间件则为异常处理
    const self = this
    const {
      body,
      url: { pathname }
    } = ctx

    // 接口 JSON格式
    if (typeof body === 'object') {
      ctx.res.end(JSON.stringify(body))
      ctx.res.writeHead(200, { 'X-powered-by': 'Orc.js' })
    } else if (self.orcProto.hasOwnProperty('router') && Object.keys(self.orcProto.router).length) {
      // 路由视图 string格式
      let filePath
      // 静态资源解析
      if (/\.\w+/.test(pathname)) {
        filePath = getAbsolutePath(`./${pathname}`)
      } else {
        // 匹配到的路由页面
        const { router } = self.orcProto
        if (router[pathname]) {
          var { title, fileName } = router[pathname]
          filePath = getAbsolutePath(`./${fileName}`)
        } else {
          ctx.res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8', 'X-powered-by': 'Orc.js' })
          ctx.res.end('404 Not Found')
        }
      }

      fs.stat(filePath, function(err, stats) {
        // 有效的文件
        if (stats) {
          const suffix = filePath.match(/\.\w+$/)[0]
          const _body = renderTpl(filePath, { title: title })
          ctx.res.writeHead(200, {
            'Content-Type': `${mineDict[suffix]}; charset=UTF-8`,
            'X-powered-by': 'Orc.js'
          })
          ctx.res.end(_body)
        } else {
          ctx.res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8', 'X-powered-by': 'Orc.js' })
          ctx.res.end('404 Not Found')
        }
      })
    } else {
      throw new Error('[请配置路由或添加中间件 new Orc({router}) || app.use()]')
    }
  }
}

module.exports = new BodyParser()
