const Orc = require('../index')
const DEV_VIEWS = require('./manage/views')
const DEV_PORT = 7000
const DEV_DIR = 'examples'
const app = new Orc({
  port: DEV_PORT,
  views: DEV_VIEWS,
  rootPath: DEV_DIR
})

const router = require('./router')

app.use(router.handle())

app.on('error', err => {
  console.log('错误提示: ', err)
})
