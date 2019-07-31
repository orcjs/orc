module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(34);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 34:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";
/*
 * @Author: 余树
 * @Date: 2019-07-24 14:48:40
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:36:05
 */


const METHODS = ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
const Eventemitter = __webpack_require__(816)
const server = __webpack_require__(713)
const errorParser = __webpack_require__(623)

class Orc extends Eventemitter {
  /**
   * 初始化参数
   * @param {Array} routerList [路由列表]
   * @param {object} conf [路由配置]
   * @param {object} req [request对象]
   * @param {object} res [response对象]
   */
  constructor(conf) {
    super()
    const port = conf.port || 3000
    this.routerList = []
    this.conf = conf || {}
    this.req = {}
    this.res = {}
    this.init()
    server.call(this, port)
  }
  /**
   * 自定义路由
   * @param {String} path [路径]
   * @param {string || object } content [内容]
   */
  init() {
    METHODS.forEach(x => {
      Orc.prototype[x.toLowerCase()] = Orc.prototype[x.toLowerCase()] = function(path, content) {
        this.routerList.push({ path, content })
      }
    })

    // 监听捕获报错
    this.on('error', errConf => {
      errorParser.call(this, errConf)
    })
  }
}

module.exports = Orc


/***/ }),

/***/ 373:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";
/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:30:04
 * @description: 静态资源处理
 */


const path = __webpack_require__(622)
const fs = __webpack_require__(747)
const URL = __webpack_require__(835)
const mine = __webpack_require__(406)
const getAbsPath = (...pathArr) => {
  return path.resolve.apply(path, [process.cwd(), ...pathArr])
}
const MAX_AGE = 2400 // 40分钟

//根据stat生成ETag
function generateETag(stat) {
  const mtime = stat.mtime.getTime().toString(16)
  const size = stat.size.toString(16)
  return `W/"${size}-${mtime}"`
}

/**
 * 判断文件缓存
 * @param {Object} req [request对象]
 * @param {Object} res [response对象]
 */
function isFresh(req, res) {
  //判断请求【req】是否让客户端继续使用缓存
  const lastModified = req.headers['if-modified-since']
  const noneMatch = req.headers['if-none-match']

  //如果这两个信息都没有，说明他很有可能是第一次请求
  if (!lastModified && !noneMatch) {
    return false
  }

  // 如果有lastModified,并且宇设置的lastModified不一样，说明也过期了
  if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
    return false
  }

  //检测etag
  if (noneMatch && noneMatch !== res.getHeader('ETag')) {
    return false
  }
  return true
}

// 处理静态资源
function handleStatic(req, res) {
  const { pathname } = URL.parse(req.url)
  const { rootPath } = this.conf
  const currRootPath = rootPath ? `/${rootPath}/` : '/'
  const filePath = getAbsPath(`.${currRootPath}${pathname}`)
  const suffix = path.extname(filePath)
  const errMsg = `404 Not Found：未找到该静态文件 "${filePath}"`

  fs.stat(filePath, (err, stat) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': `${mine[suffix]}`,
        'X-powered-by': 'orcjs'
      })
      res.end(errMsg)
      return
    }

    // 定义头部
    const headData = {
      'Content-Type': `${mine[suffix]}`,
      'X-powered-by': 'orcjs',
      'Last-Modified': stat.mtime.toUTCString() || '',
      'Cache-Control': 'private, max-age=2048',
      Expires: new Date(Date.now() + MAX_AGE * 1000).toUTCString(),
      'Content-Length': stat.size,
      ETag: generateETag(stat)
    }

    // 之前缓存文件未做修改
    if (isFresh(req, res)) {
      res.writeHead(304, headData)
      res.end('304 Not Modified')
    } else {
      const maxAge = 2400
      const { range } = req.headers

      // 文件断流
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-')
        const partialstart = parts[0]
        const partialend = parts[1]
        const start = parseInt(partialstart, 10)
        const end = partialend ? parseInt(partialend, 10) : stat.size - 1
        const chunksize = end - start + 1
        headData['Content-Range'] = 'bytes ' + start + '-' + end + '/' + stat.size
        headData['Accept-Ranges'] = 'bytes'
        headData['Content-Length'] = chunksize
        res.writeHead(206, headData)
      } else {
        res.writeHead(200, headData)
      }

      const stream = fs.createReadStream(filePath)
      stream.pipe(res)
      stream.on('end', () => {
        res.end()
      })
    }
  })
}

module.exports = handleStatic


/***/ }),

/***/ 406:
/***/ (function(module) {

"use strict";
/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-02-12 17:30:28
 * @description: Content-type
 */


const mime = {
  '.ogv': 'video/ogg',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.woff': 'application/x-font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.au': 'audio/basic',
  '.avi': 'video/avi,',
  '.bmp': 'image/bmp',
  '.bz2': 'application/x-bzip2',
  '.css': 'text/css',
  '.dtd': 'application/xml-dtd',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.dotx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
  '.es': 'application/ecmascript',
  '.exe': 'application/octet-stream',
  '.gif': 'image/gif',
  '.gz': 'application/x-gzip',
  '.hqx': 'application/mac-binhex40',
  '.html': 'text/html; charset=UTF-8',
  '.art': 'text/html; charset=UTF-8',
  '.jar': 'application/java-archive',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.midi': 'audio/x-midi',
  '.mp3': 'audio/mpeg',
  '.mpeg': 'video/mpeg',
  '.ogg': 'application/ogg',
  '.pdf': 'application/pdf',
  '.pl': 'application/x-perl',
  '.png': 'image/png',
  '.potx': 'application/vnd.openxmlformats-officedocument.presentationml.template',
  '.ppsx': 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
  '.ppt': 'application/vnd.ms-powerpointtd>',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.ps': 'application/postscript',
  '.qt': 'video/quicktime',
  '.ra': 'audio/vnd.rn-realaudio',
  '.ram': 'audio/vnd.rn-realaudio',
  '.rdf': 'application/rdf+xml',
  '.rtf': 'application/rtf',
  '.sgml': 'text/sgml',
  '.sit': 'application/x-stuffit',
  '.sldx': 'application/vnd.openxmlformats-officedocument.presentationml.slide',
  '.swf': 'application/x-shockwave-flash',
  '.tar.gz': 'application/x-tar',
  '.tgz': 'application/x-tar',
  '.tiff': 'image/tiff',
  '.tsv': 'text/tab-separated-values',
  '.txt': 'text/plain',
  '.wav': 'audio/x-wav',
  '.wma': 'audio/x-ms-wma',
  '.wmv': 'video/x-ms-wmv',
  '.xlam': 'application/vnd.ms-excel.addin.macroEnabled.12',
  '.xls': 'application/vnd.ms-excel',
  '.xlsb': 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.xltx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
  '.xml': 'application/xml',
  '.zip': 'application/zip,'
}

module.exports = mime


/***/ }),

/***/ 605:
/***/ (function(module) {

module.exports = require("http");

/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 623:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";
/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:28:08
 * @description: error处理
 */

const mine = __webpack_require__(406)

/**
 * @param {Number} statusCode [请求头状态值]
 * @param {String} suffix [请求文件后缀]
 * @param {String} msg [提示信息]
 */
function handleError({ statusCode, suffix, msg }) {
  this.res.writeHead(statusCode, {
    'Content-Type': `${mine[suffix]}`,
    'X-powered-by': 'orcjs'
  })
  this.res.end(msg)
}

module.exports = handleError


/***/ }),

/***/ 698:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";
/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:49:08
 * @description: body处理json格式、静态资源、html
 */


// 解析器
const PARSERS = ['json-parser', 'static-parser', 'html-parser']
const URL = __webpack_require__(835)

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
    currParser = __webpack_require__(960)
  } else if (/\.\w+/.test(pathname) && pathname.indexOf('.action') === -1) {
    currParser = __webpack_require__(373)
  } else {
    // 处理 body 空 || 有路由配置 || 中间件body string格式
    currParser = __webpack_require__(801)
  }
  currParser.call(this, req, res)
}

module.exports = handle


/***/ }),

/***/ 713:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";
/*
 * @Author: 余树
 * @Date: 2019-07-24 15:09:51
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:41:44
 * @description: 启动服务
 */


const http = __webpack_require__(605)
const handleParser = __webpack_require__(698)

/**
 * @param {Number} port [端口号]
 */
function server(port) {
  http
    .createServer((req, res) => {
      this.req = req
      this.res = res
      handleParser.call(this, req, res)
    })
    .listen(port)

  console.log(`- Local: http://localhost:${port}`)
}

module.exports = server


/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 801:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";
/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:46:35
 * @description: html处理
 */


const path = __webpack_require__(622)
const fs = __webpack_require__(747)
const renderTpl = __webpack_require__(972)
const URL = __webpack_require__(835)
const mine = __webpack_require__(406)
const getAbsPath = (...pathArr) => {
  return path.resolve.apply(path, [process.cwd(), ...pathArr])
}

/**
 * 递归遍历工作目录下的所有file，用于跟 router 配置项里的 fileName 做匹配校验
 * @param {String} absPath [当前工作目录]
 */
const filterByFile = absPath => {
  let files = fs.readdirSync(absPath)
  let results = []

  files.forEach(fileName => {
    let filePath = path.join(absPath, fileName)
    let stat = fs.statSync(filePath)
    if (stat && stat.isDirectory() && fileName !== 'node_modules') {
      results = results.concat(filterByFile(filePath))
    } else {
      results.push(filePath)
    }
  })
  return results
}

function handleHtml(req, res) {
  const { pathname } = URL.parse(req.url)
  const { router, rootPath } = this.conf
  let absPath
  const currRootPath = rootPath ? `/${rootPath}/` : '/'
  console.log(`请求路径 ：${pathname}`)

  // 有配置router页面
  if (router && router[pathname]) {
    var { title, fileName } = router[pathname]
    absPath = getAbsPath(`.${currRootPath}`)
    const fileList = filterByFile(absPath) // 遍历出来的有效 fileList
    const fileIdx = fileList.findIndex(x => {
      // 查找当前请求的 fileName 是否为有效文件
      return x.indexOf(fileName) > -1
    })
    let filePath = fileList[fileIdx]

    if (filePath) {
      fs.stat(filePath, (err, stats) => {
        const suffix = path.extname(filePath)
        const html = renderTpl(filePath, { title: title })

        res.writeHead(200, {
          'Content-Type': `${mine[suffix]}`,
          'X-powered-by': 'orcjs'
        })
        if (suffix === '.js') {
          const renderJS = require(filePath)
          renderJS.call(this)
        } else {
          res.end(html)
        }
      })
    } else {
      const errConf = {
        statusCode: 404,
        suffix: '.html',
        msg: `404 Not Found：请求路径 "${pathname}"， router配置项中未找到文件 "${fileName}"`
      }
      this.emit('error', errConf)
    }
  } else {
    // 无配置router
    // 中间件body 渲染
    if (typeof res.body === 'string') {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF-8',
        'X-powered-by': 'orcjs'
      })
      res.end(res.body)
    } else {
      const errConf = {
        statusCode: 404,
        suffix: '.html',
        msg: `404 Not Found， 请求路径 "${pathname}"，Router 配置项未找到`
      }
      this.emit('error', errConf)
    }
  }
}

module.exports = handleHtml


/***/ }),

/***/ 816:
/***/ (function() {

eval("require")("eventemitter3");


/***/ }),

/***/ 835:
/***/ (function(module) {

module.exports = require("url");

/***/ }),

/***/ 960:
/***/ (function(module) {

"use strict";
/*
 * @Author: 余树
 * @Date: 2019-02-09 12:53:19
 * @Last Modified by: 余树
 * @Last Modified time: 2019-07-25 14:30:07
 * @description: json处理
 */


function handleJSON(req, res) {
  const json = JSON.stringify(res.body)

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-powered-by': 'orcjs'
  })
  res.end(json)
}

module.exports = handleJSON


/***/ }),

/***/ 972:
/***/ (function() {

eval("require")("art-template");


/***/ })

/******/ });