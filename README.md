# orc
node.js  webserver framework

> 零依赖 koa express 的轻量级快速的内容管理框架


## 安装

```bash
npm i -S orcjs
```



## 快速上手

在项目根目录新建一个例如 `app.js`, 用于引入 `orcjs`


```js
const Orc = require('orcjs')
// 端口，默认端口不传为7000
const port = 8000

/*
* 路由配置
* @description key : 路由路径
* @description title : 页面标题
* @description fileName : 文件名
*/
const routes = {
  '/': { title: '首页', fileName: 'home.art' },
  '/about': { title: '关于', fileName: 'about.art' }
  '/other': { title: '其他', fileName: 'other.html' }
}

// 创建应用实例
const app = new Orc({ port, router })


// 监听报错
app.on('error', err => {
  console.log('error: ', err.stack)
})

```


```js
node app.js // 走你
```

## 模板引擎
这边使用的是 `art-template`, 具体[文档](https://aui.github.io/art-template/)


## 案例

在 `examples` 目录下， 执行 `node test.js`

