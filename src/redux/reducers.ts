import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/Auth'
import { reducer as organisations } from '../modules/Organisations'
import { reducer as user } from '../modules/User'
import { reducer as userChallenges } from '../modules/UserChallenges'

const rootReducer = combineReducers({
  auth,
  organisations,
  user,
  userChallenges,
})

export default rootReducer
