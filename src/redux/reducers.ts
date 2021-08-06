import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/Auth'
import { reducer as job } from '../modules/Job'
import { reducer as user } from '../modules/User'

const rootReducer = combineReducers({
  auth,
  user,
  job,
})

export default rootReducer
