/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-02-09 21:23:06
 * @description: context对象原型
 */
'use strict'

module.exports = {
  get url() {
    return this.request.url
  },

  get body() {
    return this.response.body
  },

  set body(data) {
    this.response.body = data
  }
}
