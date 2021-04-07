import { combineReducers, Reducer } from 'redux'

import { reducer as auth } from '../modules/Auth'
import { RootState } from './redux.types'

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  auth,
})

export default rootReducer
