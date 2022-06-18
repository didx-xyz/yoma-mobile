import { createSelector } from '@reduxjs/toolkit'

import {
  selectUserQualificationCredentialsType,
  selectUserQualificationCredentialsWidget,
} from '~/modules/UserQualifications/UserQualifications.selector'
import { UserQualificationsWidgetSelector } from '~/modules/UserQualifications/UserQualifications.types'

const selectEducationCredentials = selectUserQualificationCredentialsType(false)

export default createSelector<any, UserQualificationsWidgetSelector>(
  selectUserQualificationCredentialsWidget(selectEducationCredentials),
  ({ userQualifications, count }: UserQualificationsWidgetSelector) => ({ userQualifications, count }),
)
