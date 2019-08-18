# orc
node.js  webserver framework

> 零依赖 koa express 的轻量级快速的内容管理框架（玩具）

## 安装

```bash
npm i -S orcjs
```

## 初始化配置

在项目根目录新建一个例如 `app.js`, 用于引入 `orcjs`


```js
const Orc = require('orcjs')
// 自定义路由页面文件，具体参数配置请严格按照 example/manage/router.js 规范
const ROUTER_CONF = require('./manage/router')

// 实例化对象
const app = new Orc({
  port: 8887, // 定义端口 || 默认值 3000
  routerConf: ROUTER_CONF,
  rootPath: 'examples' // 开发目录 || 默认值当前目录
})
```

## 定义路由的两种方式

### API
```js
// 定义JSON
// 支持 GET, PUT, PATCH, POST, DELETE 方法
app.get('/me', {
  code: 1,
  resultData: {
    name: '余树',
    age: 18,
    city: 'HangZhou'
  }
})

// 定义HTML
app.get('/orc', 'hellow orcjs')
```

### 配置路由
> 更加灵活的结合模板编辑页面
```js
  router: ROUTER_CONF // 配置路由
```

例如定义了一个 `test.js`文件
```js
// 函数体暴露req、res对象
module.exports = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8',
    'X-powered-by': 'orcjs'
  })
  res.end('hello orcjs')
}
```

## 模板引擎
这边使用的是 `art-template`, 具体[文档](https://aui.github.io/art-template/)

## 案例
下载本地 `git clone https://github.com/orcjs/orc-example.git`

在根目录下执行 `node app`

## 注意事项
- 路由规则
  + `routerConf` 项定义的 `fileName` 是在你定义的 `rootPath` 开发目录下进行递归查询的，若没找到该文件，Orc 会进行错误提示
  + `routerConf` 和 `node服务端js` 两个可以一起使用，看具体场景
- 目前还不支持第三方中间件

## License

MIT














