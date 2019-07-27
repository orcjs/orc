/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:46:35
 * @description: html处理
 */
'use strict'

const path = require('path')
const fs = require('fs')
const renderTpl = require('art-template')
const URL = require('url')
const mine = require('../utils/mine')
const getAbsPath = (...pathArr) => {
  return path.resolve.apply(path, [process.cwd(), ...pathArr])
}

/**
 * 递归遍历工作目录下的所有file，用于跟 router 配置项里的 fileName 做匹配校验
 * @param {String} absPath [当前工作目录]
 */
const filterByFile = absPath => {
  let files = fs.readdirSync(absPath)
  let results = []

  files.forEach(fileName => {
    let filePath = path.join(absPath, fileName)
    let stat = fs.statSync(filePath)
    if (stat && stat.isDirectory() && fileName !== 'node_modules') {
      results = results.concat(filterByFile(filePath))
    } else {
      results.push(filePath)
    }
  })
  return results
}

function handleHtml(req, res) {
  const { pathname } = URL.parse(req.url)
  const { router, rootPath } = this.conf
  let absPath
  const currRootPath = rootPath ? `/${rootPath}/` : '/'
  console.log(`请求路径 ：${pathname}`)

  // 有配置router页面
  if (router && router[pathname]) {
    var { title, fileName } = router[pathname]
    absPath = getAbsPath(`.${currRootPath}`)
    const fileList = filterByFile(absPath) // 遍历出来的有效 fileList
    const fileIdx = fileList.findIndex(x => {
      // 查找当前请求的 fileName 是否为有效文件
      return x.indexOf(fileName) > -1
    })
    let filePath = fileList[fileIdx]

    if (filePath) {
      fs.stat(filePath, (err, stats) => {
        const suffix = path.extname(filePath)
        const html = renderTpl(filePath, { title: title })

        res.writeHead(200, {
          'Content-Type': `${mine[suffix]}`,
          'X-powered-by': 'orcjs'
        })
        if (suffix === '.js') {
          const renderJS = require(filePath)
          renderJS.call(this)
        } else {
          res.end(html)
        }
      })
    } else {
      const errConf = {
        statusCode: 404,
        suffix: '.html',
        msg: `404 Not Found：请求路径 "${pathname}"， router配置项中未找到文件 "${fileName}"`
      }
      this.emit('error', errConf)
    }
  } else {
    // 无配置router
    // 中间件body 渲染
    if (typeof res.body === 'string') {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8',
        'X-powered-by': 'orcjs'
      })
      res.end(res.body)
    } else {
      const errConf = {
        statusCode: 404,
        suffix: '.html',
        msg: `404 Not Found， 请求路径 "${pathname}"，Router 配置项未找到`
      }
      this.emit('error', errConf)
    }
  }
}

module.exports = handleHtml
