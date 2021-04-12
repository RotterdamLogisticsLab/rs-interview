import * as React from 'react'
import { withRouter } from 'react-router-dom'
import styles from './app.module.scss'

const App = (): React.ReactElement => {
  return <div className={styles.app}>This is an app</div>
}

export default withRouter(App)
