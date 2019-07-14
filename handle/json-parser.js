/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-02-12 15:47:29
 * @description: json处理
 */
'use strict'

function handle(self, ctx) {
  const { body } = ctx
  const json = JSON.stringify(body)

  ctx.res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-powered-by': 'orcjs'
  })
  ctx.res.end(json)
}

module.exports = handle
