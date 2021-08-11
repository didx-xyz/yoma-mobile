import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/Auth'
import { reducer as skills } from '../modules/Skills'
import { reducer as user } from '../modules/User'
import { reducer as userChallenges } from '../modules/UserChallenges'

const rootReducer = combineReducers({
  auth,
  skills,
  user,
  userChallenges,
})

export default rootReducer
