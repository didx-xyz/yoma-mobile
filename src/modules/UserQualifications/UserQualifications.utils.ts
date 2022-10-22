import { always, compose, isEmpty, not, pathOr, pipe, propOr, unless, when } from 'ramda'

import { DATE_TPL_MON_YEAR } from '~/constants/date.constants'
import { getCredentialViewMetadata } from '~/modules/User/User.utils'
import { formatDateString } from '~/utils/dates.utils'

export const getUserQualificationsMetadata = getCredentialViewMetadata({
  endData: compose(unless(isEmpty, formatDateString(DATE_TPL_MON_YEAR)), propOr('', 'endDate')),
})

export const filterEducationOrCourse = (isCourse: boolean) =>
  pipe(pathOr(false, ['opportunity', 'createdByAdmin']), when(always(isCourse), not))
