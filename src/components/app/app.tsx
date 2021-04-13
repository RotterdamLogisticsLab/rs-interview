import * as React from 'react'
import { withRouter } from 'react-router-dom'
import styles from './app.module.scss'

const App = () => {
  const [dummy, setDummy] = React.useState<any>({})

  return (
    <div className={styles.app}>
      <h1>Routescanner Interview</h1>
      <button
        onClick={() => {
          const index = dummy ? Object.keys(dummy).length : 0
          const copyDummy = dummy ? JSON.parse(JSON.stringify(dummy)) : {}
          copyDummy[`prop${index}`] = index
          setDummy(copyDummy)
        }}>
        Set dummy
      </button>
      {!!dummy && <pre className={styles.codeStyle}>{JSON.stringify(dummy, undefined, 2)}</pre>}
    </div>
  )
}

export default withRouter(App)
