import { selectCompletedCoursesCredentials } from '~/modules/CompletedCourses/CompletedCourses.selector'

import { selectUserQualificationCredentialsWidget } from '../../UserEducation/UserEducation.selector'

export default selectUserQualificationCredentialsWidget(selectCompletedCoursesCredentials)
