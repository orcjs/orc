/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-02-16 18:10:21
 * @description: body处理json格式、静态资源、html
 */
'use strict'

// 解析器
const PARSERS = ['json-parser', 'static-parser', 'html-parser']

/**
 *
 * @param {*obj} self orc实例
 * @param {*obj} ctx ctx对象
 */
function handle(self, ctx) {
  const {
    body,
    url: { pathname }
  } = ctx
  let currParser

  if (typeof body === 'object') {
    currParser = require(`./${PARSERS[0]}.js`)
  } else if (/\.\w+/.test(pathname) && pathname.indexOf('.action') === -1) {
    currParser = require(`./${PARSERS[1]}.js`)
  } else {
    // 处理 body 空 || 有路由配置 || 中间件body string格式
    currParser = require(`./${PARSERS[2]}.js`)
  }
  currParser(self, ctx)
}

module.exports = handle
