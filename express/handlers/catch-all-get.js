const catchAllGet = (req, res) => {
  console.log('[RSI catchAllGet] no route:', req.get('host') + req.originalUrl)
  res.redirect('/')
}

module.exports = catchAllGet
