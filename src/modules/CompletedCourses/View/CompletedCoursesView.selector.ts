import { selectCompletedCoursesCredentials } from '~/modules/CompletedCourses/CompletedCourses.selector'

import { selectUserQualificationCredentialsView } from '../../UserEducation/UserEducation.selector'

export default selectUserQualificationCredentialsView(selectCompletedCoursesCredentials)
