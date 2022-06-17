import { createSelector } from '@reduxjs/toolkit'

import { selectors as UserQualificationSelectors, types as UserQualificationTypes } from '~/modules/UserQualifications'

import { selectCompletedCourses } from '../CompletedCourses.selector'

export default createSelector<any, UserQualificationTypes.UserQualificationsViewCredentials>(
  UserQualificationSelectors.selectUserQualificationCredentialsView(selectCompletedCourses),
  (userQualifications: UserQualificationTypes.UserQualificationsViewCredentials) => userQualifications,
)
