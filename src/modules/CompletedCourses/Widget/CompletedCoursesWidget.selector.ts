import { selectCompletedCoursesCredentials } from '~/modules/CompletedCourses/CompletedCourses.selector'
import { selectUserQualificationCredentialsWidget } from '~/modules/UserQualifications/UserQualifications.selector'

export default selectUserQualificationCredentialsWidget(selectCompletedCoursesCredentials)
