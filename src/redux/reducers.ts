import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/Auth'
import { userReducer } from '../modules/User'

const rootReducer = combineReducers({
  auth,
  user: userReducer,
})

export default rootReducer
