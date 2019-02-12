/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-02-12 18:12:05
 * @description: 静态资源处理
 */
'use strict'

const path = require('path')
const fs = require('fs')
const mine = require('../utils/mine')
const getAbsolutePath = (...pathArr) => {
  return path.resolve.apply(path, [process.cwd(), ...pathArr])
}

function handle(self, ctx) {
  const {
    url: { pathname }
  } = ctx
  const filePath = getAbsolutePath(`./${pathname}`)
  const suffix = path.extname(filePath)
  const msg = `404 Not Found：未找到该静态文件 "${filePath}"`

  fs.stat(filePath, (err, stats) => {
    ctx.res.writeHead(stats ? 200 : 404, {
      'Content-Type': `${mine[suffix]}`,
      'X-powered-by': 'orcjs'
    })
    ctx.res.end(stats ? fs.readFileSync(filePath) : msg)

    if (!stats) self.emit('error', msg)
  })
}

module.exports = handle
