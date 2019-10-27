module.exports = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8'
  })
  res.end('hello orcjs')
}
