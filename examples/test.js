const Orc = require('../index')
const router = require('./manage/router')
const port = 7000

const app = new Orc({ port, router })

// app.use(async (ctx, next) => {
//   await next()
//   ctx.body = '李宙凯'
// })

app.on('error', err => {
  console.log('error happends: ', err.stack)
})
