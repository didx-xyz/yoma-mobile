import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/Auth'
import { reducer as credentials } from '../modules/Credentials'
import { reducer as user } from '../modules/User'

const rootReducer = combineReducers({
  auth,
  user,
  credentials,
})

export default rootReducer
