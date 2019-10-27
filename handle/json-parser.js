/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:30:07
 * @description: json处理
 */
'use strict'

function handleJSON(req, res) {
  const json = JSON.stringify(res.body)

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })
  res.end(json)
}

module.exports = handleJSON
