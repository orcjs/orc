# orc
node.js  webserver framework

> 零依赖 koa express 的轻量级快速的内容管理框架（玩具）


## 安装

```bash
npm i -S orcjs
```



## 快速上手

在项目根目录新建一个例如 `app.js`, 用于引入 `orcjs`


```js
const Orc = require('orcjs')
const DEV_PORT = 8000 // 默认端口不传为7000
const DEV_DIR = 'examples'  // 定义你的开发工作目录，默认不传为当前目录


// 给 app 实例建立路由有两种选择
// 1).配置 views 项，这边主要适用于给指定文件约定你想要访问的路由路径
// 2).自带 Router 实例，支持get、post、del、put方法， 通过回调方法渲染页面或请求接口

/*
* 1).views 路由配置：给指定文件约定你想要访问的路由路径
* @description key : 路由路径
* @description title : 页面标题
* @description fileName : 文件名
*/
const DEV_VIEWS = {
  '/': { title: '页面1', fileName: 'page1.art' },
  '/page2': { title: '页面2', fileName: 'page2.art' },
  '/page3': { title: '页面3', fileName: 'page3.html' },
  '/xx': { title: '其他页面', fileName: 'other2.html' }
}

/*
* 2). Router 配置： 通过回调方法渲染页面或请求接口
*/
const Router = require('orcjs/middleware//orc-router')
const router = new Router()
router.get('/list', async ctx => {
  ctx.body = {
    code: 0,
    msg: 'success'
  }
})


// 创建应用实例
const app = new Orc({
  port: DEV_PORT,
  views: DEV_VIEWS,
  rootPath: DEV_DIR
})

// 注册路由
app.use(router.handle())

// 监听报错
app.on('error', err => {
  console.log('报错信息: ', err)
})

node app.js // 走你
```

## 模板引擎
这边使用的是 `art-template`, 具体[文档](https://aui.github.io/art-template/)


## 案例
下载本地 `git clone https://github.com/orcjs/orc-example.git`

在根目录下执行 `node app`

## 注意事项
- 路由规则
  + `views` 项定义的 `fileName` 是在你定义的 `rootPath` 开发目录下进行递归查询的，若没找到该文件，Orc 会进行错误提示
  + `views` 和 `router` 两个可以一起使用，看具体场景
- 目前还不支持第三方中间件

## License

MIT














