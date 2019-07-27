/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:49:08
 * @description: body处理json格式、静态资源、html
 */
'use strict'

// 解析器
const PARSERS = ['json-parser', 'static-parser', 'html-parser']
const URL = require('url')

/**
 *
 * @param {obj} req [request对象]
 * @param {obj} res [response对象]
 */
function handle(req, res) {
  const { pathname } = URL.parse(req.url)
  let currParser

  // 遍历定义的路由列表
  if (this.routerList.length) {
    this.routerList.forEach(x => {
      if (x.path === pathname) {
        res.body = x.content
      }
    })
  }

  if (typeof res.body === 'object') {
    currParser = require(`./${PARSERS[0]}.js`)
  } else if (/\.\w+/.test(pathname) && pathname.indexOf('.action') === -1) {
    currParser = require(`./${PARSERS[1]}.js`)
  } else {
    // 处理 body 空 || 有路由配置 || 中间件body string格式
    currParser = require(`./${PARSERS[2]}.js`)
  }
  currParser.call(this, req, res)
}

module.exports = handle
