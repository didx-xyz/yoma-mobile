import { applySpec, compose, isEmpty, pipe, propOr, reject, unless, values } from 'ramda'

import { DATE_TPL_MON_YEAR } from '~/constants/date.constants'
import { formatDateString } from '~/utils/dates.utils'

export const getEducationMetadata = pipe(
  applySpec({
    endData: compose(unless(isEmpty, formatDateString(DATE_TPL_MON_YEAR)), propOr('', 'endDate')),
  }),
  values,
  reject(isEmpty),
)
