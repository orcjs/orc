# orc
node.js  webserver framework

> 零依赖 koa express 的轻量级快速的内容管理框架


## 安装

```bash
git close https://github.com/orcjs/orc.git
```



## 快速上手

在项目目录根目录新建一个例如 `app.js`, 用于引入 `orcjs`


```js
// 创建Orc实例
const Orc = require('../orc')
// 端口，默认端口不传为7000
const port = 8000

// 路由配置
const routes = {
  '/': { title: '首页', fileName: 'home.art' },
  '/about': { title: '关于', fileName: 'about.art' }
}

const app = new Orc({ port, router })

// 中间件用于注册内容 支持 obj arr string number
app.use(async (ctx, next) => {
  await next()
  ctx.body = {
    code: 0,
    data: ['hello Word']
  }
})

// 监听报错
app.on('error', err => {
  console.log('error happends: ', err.stack)
})

```

## 模板引擎
这边使用的是 `art-template`, 具体[文档](https://aui.github.io/art-template/)


## 案例

在 `examples` 目录下， 执行 `node test.js`

