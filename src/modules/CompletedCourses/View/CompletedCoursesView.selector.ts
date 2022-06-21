import { selectCompletedCoursesCredentials } from '~/modules/CompletedCourses/CompletedCourses.selector'
import { selectUserQualificationCredentialsView } from '~/modules/UserQualifications/UserQualifications.selector'

export default selectUserQualificationCredentialsView(selectCompletedCoursesCredentials)
