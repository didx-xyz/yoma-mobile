import { always, applySpec, compose, isEmpty, not, pathOr, pipe, propOr, reject, unless, values, when } from 'ramda'

import { DATE_TPL_MON_YEAR } from '~/constants/date.constants'
import { formatDateString } from '~/utils/dates.utils'

export const getUserQualificationsMetadata = pipe(
  applySpec({
    endData: compose(unless(isEmpty, formatDateString(DATE_TPL_MON_YEAR)), propOr('', 'endDate')),
  }),
  values,
  reject(isEmpty),
)

export const filterEducationOrCourse = (isCourse: boolean) =>
  pipe(pathOr(false, ['qualification', 'createdByAdmin']), when(always(isCourse), not))
