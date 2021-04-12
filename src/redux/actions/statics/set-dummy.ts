import { ActionRedux } from '../../../types'

export const SET_DUMMY = 'SET_DUMMY'

export function setDummy(payload: any): ActionRedux {
  return {
    payload,
    type: SET_DUMMY
  }
}
