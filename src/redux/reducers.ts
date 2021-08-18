import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/Auth'
import { reducer as jobs } from '../modules/Jobs'
import { reducer as organisations } from '../modules/Organisations'
import { reducer as user } from '../modules/User'
import { reducer as userChallenges } from '../modules/UserChallenges'
import { reducer as userJobs } from '../modules/UserJobs'

const rootReducer = combineReducers({
  auth,
  organisations,
  user,
  jobs,
  userJobs,
  userChallenges,
})

export default rootReducer
