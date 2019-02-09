/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-02-09 19:21:41
 * @description: request对象原型
 */
'use strict'

const _url = require('url')

module.exports = {
  get url() {
    return _url.parse(this.req.url, true)
  }
}
