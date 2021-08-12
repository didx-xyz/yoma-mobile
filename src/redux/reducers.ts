import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/Auth'
import { reducer as user } from '../modules/User'
import { reducer as userChallenges } from '../modules/UserChallenges'
import { USER_CHALLENGES_STATE_KEY } from '../modules/UserChallenges/UserChallenges.constants'

const rootReducer = combineReducers({
  auth,
  user,
  [USER_CHALLENGES_STATE_KEY]: userChallenges,
})

export default rootReducer
