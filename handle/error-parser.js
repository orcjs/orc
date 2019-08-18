/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:28:08
 * @description: error处理
 */
'use strict'
const mine = require('../utils/mine')

/**
 * @param {Number} statusCode [请求头状态值]
 * @param {String} suffix [请求文件后缀]
 * @param {String} msg [提示信息]
 */
function handleError(res, { statusCode, suffix, msg }) {
  res.writeHead(statusCode, {
    'Content-Type': `${mine[suffix]}`,
    'X-powered-by': 'orcjs'
  })
  res.end(msg)
}

module.exports = handleError
