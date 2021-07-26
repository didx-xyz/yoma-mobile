import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/Auth'
import { reducer as organisations } from '../modules/Organisations'
import { reducer as skills } from '../modules/Skills'
import { reducer as user } from '../modules/User'
import { reducer as userCredentials } from '../modules/UserCredentials'

const rootReducer = combineReducers({
  auth,
  user,
  userCredentials,
  organisations,
  skills,
})

export default rootReducer
