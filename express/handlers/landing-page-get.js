const path = require('path')

const titles = {
  home: 'Home'
}

const landingPageGet = (req, res) => {
  const ip = req.connection.remoteAddress
  console.log(`[RSI landingPageGet] serve index.html to ${ip}`)
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')

  const key = req.path
    .split('/')
    .filter(c => !!c)
    .shift()
  const title = !!key && !!titles[key] ? `${titles[key]} - Routescanner Interview` : 'Routescanner Interview'
  return res.render(path.join(__dirname, '../../dist/template.pug'), {
    title
  })
}

module.exports = landingPageGet
