import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/Auth'
import { reducer as credentials } from '../modules/Credentials'
import { reducer as organisations } from '../modules/Organisations'
import { reducer as skills } from '../modules/Skills'
import { reducer as user } from '../modules/User'

const rootReducer = combineReducers({
  auth,
  user,
  credentials,
  organisations,
  skills,
})

export default rootReducer
