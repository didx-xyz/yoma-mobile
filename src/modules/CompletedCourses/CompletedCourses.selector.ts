import { selectUserQualificationCredentialsType } from '~/modules/UserQualifications/UserQualifications.selector'

export const selectCompletedCoursesCredentials = selectUserQualificationCredentialsType(true)
