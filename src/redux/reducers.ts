import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/Auth'

const rootReducer = combineReducers({
  auth,
})

export default rootReducer
