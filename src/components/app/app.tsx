import * as React from 'react'
import { IStateApp } from '../../types'
import { setDummy } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styles from './app.module.scss'

const App = (): React.ReactElement => {
  const dispatch = useDispatch()
  const dummy = useSelector((state: IStateApp) => state.statics.dummy)

  return (
    <div className={styles.app}>
      <h1>Routescanner Interview</h1>
      <button
        onClick={() => {
          const index = dummy ? Object.keys(dummy).length : 0
          const copyDummy = dummy ? JSON.parse(JSON.stringify(dummy)) : {}
          copyDummy[`prop${index}`] = index
          dispatch(setDummy(copyDummy))
        }}>
        Set dummy
      </button>
      {!!dummy && <pre className={styles.codeStyle}>{JSON.stringify(dummy, undefined, 2)}</pre>}
    </div>
  )
}

export default withRouter(App)
