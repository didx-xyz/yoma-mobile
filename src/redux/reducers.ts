import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/Auth'
import { reducer as user } from '../modules/User'
import { reducer as userChallenges } from '../modules/User/Challenges'

const rootReducer = combineReducers({
  auth,
  user,
  userChallenges,
})

export default rootReducer
