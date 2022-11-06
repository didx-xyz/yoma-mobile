import { combineReducers } from 'redux'

import { reducer as auth } from '~/modules/Auth'
import { reducer as challenges } from '~/modules/Challenges'
import { reducer as countries } from '~/modules/Countries'
import { reducer as organisations } from '~/modules/Organisations'
import { reducer as skills } from '~/modules/Skills'
import { reducer as user } from '~/modules/User'
import { reducer as userChallenges } from '~/modules/UserChallenges'
import { reducer as userEducation } from '~/modules/UserEducation'
import { reducer as userQualifications } from '~/modules/UserQualifications'
import { reducer as userSkills } from '~/modules/UserSkills'
import { reducer as userWorkExperiences } from '~/modules/UserWorkExperience'
import { reducer as workExperiences } from '~/modules/WorkExperience'

const rootReducer = combineReducers({
  auth,
  challenges,
  countries,
  organisations,
  skills,
  user,
  userChallenges,
  userQualifications,
  userEducation,
  userSkills,
  userWorkExperiences,
  workExperiences,
})

export default rootReducer
