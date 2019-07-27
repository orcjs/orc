module.exports = function() {
  this.res.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8',
    'X-powered-by': 'orcjs'
  })
  this.res.end('hello orcjs')
}
