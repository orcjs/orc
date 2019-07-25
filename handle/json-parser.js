/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:30:07
 * @description: json处理
 */
'use strict'

function handleJSON() {
  const json = JSON.stringify(this.res.body)

  this.res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-powered-by': 'orcjs'
  })
  this.res.end(json)
}

module.exports = handleJSON
