const Orc = require('../index')
const ROUTER_CONF = require('./manage/router')

const app = new Orc({
  port: 8887,
  routerConf: ROUTER_CONF,
  rootPath: 'demo'
})

// JSON
app.get('/me', {
  code: 1,
  resultData: {
    name: '余树',
    age: 18,
    city: 'HangZhou'
  }
})

// HTML
app.get('/orc', 'hellow orcjs')
