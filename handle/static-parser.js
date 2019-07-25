/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:30:04
 * @description: 静态资源处理
 */
'use strict'

const path = require('path')
const fs = require('fs')
const URL = require('url')
const mine = require('../utils/mine')
const getAbsPath = (...pathArr) => {
  return path.resolve.apply(path, [process.cwd(), ...pathArr])
}

function handleStatic() {
  const { pathname } = URL.parse(this.req.url)
  const { rootPath } = this.conf
  const currRootPath = rootPath ? `/${rootPath}/` : '/'
  const filePath = getAbsPath(`.${currRootPath}${pathname}`)
  const suffix = path.extname(filePath)
  const msg = `404 Not Found：未找到该静态文件 "${filePath}"`

  fs.stat(filePath, (err, stats) => {
    this.res.writeHead(stats ? 200 : 404, {
      'Content-Type': `${mine[suffix]}`,
      'X-powered-by': 'orcjs'
    })
    this.res.end(stats ? fs.readFileSync(filePath) : msg)
  })
}

module.exports = handleStatic
