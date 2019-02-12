const Orc = require('../index')
const router = require('./manage/router')
const port = 7000
const app = new Orc({ port, router })

app.on('error', err => {
  console.log('错误提示: ', err)
})
