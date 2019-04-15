/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-02-15 15:35:56
 * @description: response对象原型
 */
'use strict'

module.exports = {
  get body() {
    return this._body
  },
  set body(data) {
    this._body = data
  }
}
