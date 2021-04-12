import * as React from 'react'
import { Route, Router } from 'react-router-dom'
import { render } from 'react-dom'
import App from './components/app/app'
import history from './history'

const app = document.getElementById('rs-interview')
// eslint-disable-next-line no-null/no-null
if (app === null) {
  throw new Error('no rs-interview element')
}

function run(): void {
  render(
    <Router history={history} component={App}>
      <Route path={'*'} render={() => <App />} />
    </Router>,
    app
  )
}

setTimeout(() => run(), 0)
