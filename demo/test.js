module.exports = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8',
    'X-powered-by': 'orcjs'
  })
  res.end('hello orcjs')
}
