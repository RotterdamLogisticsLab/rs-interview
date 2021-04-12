import { ActionType, IAction } from '../../../types'
import { SET_DUMMY } from '../../actions'

export interface IStateStatics {
  dummy: any
}

const initialStateStatics: IStateStatics = {
  dummy: undefined
}

const statics = (state: IStateStatics = initialStateStatics, action: IAction<ActionType>): IStateStatics => {
  switch (action.type) {
    case SET_DUMMY: {
      return {
        ...state,
        dummy: action.payload
      }
    }
    default:
      return state
  }
}

export default statics
