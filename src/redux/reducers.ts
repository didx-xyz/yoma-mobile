import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/Auth'
import { reducer as user } from '../modules/User'
import { reducer as userJobs } from '../modules/UserJobs'

const rootReducer = combineReducers({
  auth,
  user,
  userJobs,
})

export default rootReducer
