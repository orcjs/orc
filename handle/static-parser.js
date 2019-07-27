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
const MAX_AGE = 2400 // 40分钟

//根据stat生成ETag
function generateETag(stat) {
  const mtime = stat.mtime.getTime().toString(16)
  const size = stat.size.toString(16)
  return `W/"${size}-${mtime}"`
}

/**
 * 判断文件缓存
 * @param {Object} req [request对象]
 * @param {Object} res [response对象]
 */
function isFresh(req, res) {
  //判断请求【req】是否让客户端继续使用缓存
  const lastModified = req.headers['if-modified-since']
  const noneMatch = req.headers['if-none-match']

  //如果这两个信息都没有，说明他很有可能是第一次请求
  if (!lastModified && !noneMatch) {
    return false
  }

  // 如果有lastModified,并且宇设置的lastModified不一样，说明也过期了
  if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
    return false
  }

  //检测etag
  if (noneMatch && noneMatch !== res.getHeader('ETag')) {
    return false
  }
  return true
}

// 处理静态资源
function handleStatic(req, res) {
  const { pathname } = URL.parse(req.url)
  const { rootPath } = this.conf
  const currRootPath = rootPath ? `/${rootPath}/` : '/'
  const filePath = getAbsPath(`.${currRootPath}${pathname}`)
  const suffix = path.extname(filePath)
  const errMsg = `404 Not Found：未找到该静态文件 "${filePath}"`

  fs.stat(filePath, (err, stat) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': `${mine[suffix]}`,
        'X-powered-by': 'orcjs'
      })
      res.end(errMsg)
      return
    }

    // 定义头部
    const headData = {
      'Content-Type': `${mine[suffix]}`,
      'X-powered-by': 'orcjs',
      'Last-Modified': stat.mtime.toUTCString() || '',
      'Cache-Control': 'private, max-age=2048',
      Expires: new Date(Date.now() + MAX_AGE * 1000).toUTCString(),
      'Content-Length': stat.size,
      ETag: generateETag(stat)
    }

    // 之前缓存文件未做修改
    if (isFresh(req, res)) {
      res.writeHead(304, headData)
      res.end('304 Not Modified')
    } else {
      const maxAge = 2400
      const { range } = req.headers

      // 文件断流
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-')
        const partialstart = parts[0]
        const partialend = parts[1]
        const start = parseInt(partialstart, 10)
        const end = partialend ? parseInt(partialend, 10) : stat.size - 1
        const chunksize = end - start + 1
        headData['Content-Range'] = 'bytes ' + start + '-' + end + '/' + stat.size
        headData['Accept-Ranges'] = 'bytes'
        headData['Content-Length'] = chunksize
        res.writeHead(206, headData)
      } else {
        res.writeHead(200, headData)
      }

      const stream = fs.createReadStream(filePath)
      stream.pipe(res)
      stream.on('end', () => {
        res.end()
      })
    }
  })
}

module.exports = handleStatic
