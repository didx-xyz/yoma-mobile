import { compose, isEmpty, propOr, unless } from 'ramda'

import { DATE_TPL_MON_YEAR } from '~/constants/date.constants'
import { getCredentialViewMetadata } from '~/modules/User/User.utils'
import { formatDateString } from '~/utils/dates.utils'

export const getUserEducationMetadata = getCredentialViewMetadata({
  endData: compose(unless(isEmpty, formatDateString(DATE_TPL_MON_YEAR)), propOr('', 'endDate')),
})
