import * as React from 'react'
import { Provider } from 'react-redux'
import { Route, Router } from 'react-router-dom'
import { Store, applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { render } from 'react-dom'
import App from './components/app/app'
import history from './history'
import reducers from './redux/reducers'
import thunk from 'redux-thunk'

const loggerMiddleware = createLogger()
let store: Store

if (process.env.NODE_ENV !== 'production') {
  store = createStore(reducers, applyMiddleware(thunk, loggerMiddleware))
} else {
  store = createStore(reducers, applyMiddleware(thunk))
}

const app = document.getElementById('rs-interview')
// eslint-disable-next-line no-null/no-null
if (app === null) {
  throw new Error('no rs-interview element')
}

function run(): void {
  render(
    <Provider store={store}>
      <Router history={history} component={App}>
        <Route path={'*'} render={() => <App />} />
      </Router>
    </Provider>,
    app
  )
}

setTimeout(() => run(), 0)
