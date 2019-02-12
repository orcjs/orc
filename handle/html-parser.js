/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-02-12 18:12:01
 * @description: html处理
 */
'use strict'

const path = require('path')
const fs = require('fs')
const renderTpl = require('art-template')
const mine = require('../utils/mine')
const getAbsolutePath = (...pathArr) => {
  return path.resolve.apply(path, [process.cwd(), ...pathArr])
}

function handle(self, ctx) {
  const {
    url: { pathname }
  } = ctx
  let filePath
  const { router } = self.orcProto

  if (router[pathname]) {
    var { title, fileName } = router[pathname]
    filePath = getAbsolutePath(`./${fileName}`)
  } else {
    throw {
      statusCode: 404,
      suffix: '.html',
      msg: '404 Not Found：请配置路由：new Orc({...router})'
    }
  }

  fs.stat(filePath, function(err, stats) {
    const suffix = path.extname(filePath)
    const html = renderTpl(filePath, { title: title })
    const msg = `404 Not Found：请为该路由配置文件 "${filePath}"`

    ctx.res.writeHead(stats ? 200 : 404, {
      'Content-Type': `${mine[suffix]}`,
      'X-powered-by': 'orcjs'
    })
    ctx.res.end(stats ? html : msg)
    if (!stats) self.emit('error', msg)
  })
}

module.exports = handle
