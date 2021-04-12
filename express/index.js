const express = require('express')
const catchAllGet = require('./handlers/catch-all-get')
const landingPageGet = require('./handlers/landing-page-get')

const config = require('dotenv').config().parsed

const run = () => {
  console.info(`[RSI Express] running ${config.NODE_ENV} environment`)
  const port = config.PORT || 5005
  express()
    .set('trust proxy', 1)
    .set('view engine', 'pug')
    .get('/', landingPageGet)
    .get('/*', catchAllGet)
    .listen(port, () => console.log(`[RSI Express] listening on ${port}`))
}

module.exports = run
