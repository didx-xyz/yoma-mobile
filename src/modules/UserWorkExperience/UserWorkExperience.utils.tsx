import { isEmpty, join, map, of, pathOr, pick, pipe, props, unless } from 'ramda'

import { DATE_TPL_MON_YEAR } from '~/constants/date.constants'
import { getCredentialViewMetadata } from '~/modules/User/User.utils'
import { formatDateString } from '~/utils/dates.utils'

export const extractUserWorkExperienceFromData = pipe(
  pick([
    'id',
    'verifiedAt',
    'approved',
    'approvalMessage',
    'startDate',
    'endDate',
    'createdAt',
    'fileId',
    'fileURL',
    'requestVerification',
    'opportunity',
  ]),
  of,
)

export const getUserWorkExperienceMetadata = getCredentialViewMetadata({
  company: pathOr('', ['workExperience', 'organisationName']),
  duration: pipe(
    props(['startDate', 'endDate']),
    map(unless(isEmpty, formatDateString(DATE_TPL_MON_YEAR))),
    join(' - '),
  ),
})
