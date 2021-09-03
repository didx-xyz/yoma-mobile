import { combineReducers } from 'redux'

import { reducer as auth } from '../modules/Auth'
import { reducer as jobs } from '../modules/Jobs'
import { reducer as organisations } from '../modules/Organisations'
import { reducer as skills } from '../modules/Skills'
import { reducer as user } from '../modules/User'
import { reducer as userChallenges } from '../modules/UserChallenges'
import { reducer as userJobs } from '../modules/UserJobs'
import { reducer as userSkills } from '../modules/UserSkills'

const rootReducer = combineReducers({
  auth,
  organisations,
  skills,
  user,
  jobs,
  userSkills,
  userJobs,
  userChallenges,
})

export default rootReducer
