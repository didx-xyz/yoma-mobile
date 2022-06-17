import { selectors as UserQualificationSelectors } from '~/modules/UserQualifications'

export const selectCompletedCourses = UserQualificationSelectors.selectUserQualificationCredentialsType(false)
