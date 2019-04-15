const Router = require('../../middleware/orc-router')
const router = new Router()

router.get('/list', async ctx => {
  const data = [
    {
      name: 'kevin',
      age: 12
    },
    {
      name: 'tom',
      age: 20
    }
  ]
  let _html = ''
  data.forEach(x => {
    _html += `<li>${x.name}</li>`
  })

  ctx.body = _html
})

router.get('/api/user', async ctx => {
  ctx.body = {
    code: '0',
    data: {
      name: 'Aomine',
      age: 18,
      address: 'HangZhou'
    }
  }
})

module.exports = router
