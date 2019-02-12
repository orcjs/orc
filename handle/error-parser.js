/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-02-12 17:24:33
 * @description: error处理
 */
'use strict'
const mine = require('../utils/mine')

/**
 * @param {Object} err Error对象
 * @param {Object} ctx ctx实例
 */
function handle(self, ctx, { statusCode, suffix, msg }) {
  ctx.res.writeHead(statusCode, {
    'Content-Type': `${mine[suffix]}`,
    'X-powered-by': 'orcjs'
  })
  ctx.res.end(msg)
  self.emit('error', msg)
}

module.exports = handle
