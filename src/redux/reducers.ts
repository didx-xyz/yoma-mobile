import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/Auth'
import { reducer as job } from '../modules/Jobs'
import { reducer as user } from '../modules/User'
import { reducer as userChallenges } from '../modules/UserChallenges'
import { reducer as userJobs } from '../modules/UserJobs'

const rootReducer = combineReducers({
  auth,
  user,
  job,
  userJobs,
  userChallenges,
})

export default rootReducer
