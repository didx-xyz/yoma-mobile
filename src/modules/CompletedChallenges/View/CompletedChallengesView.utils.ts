import { compose, pathOr, pick } from 'ramda'

import { utils as UserUtils } from '~/modules/User'
import { formatStartEndString } from '~/utils/dates.utils'

export const getCompletedChallengesMetadata = UserUtils.getCredentialViewMetadata({
  organisation: pathOr('', ['opportunity', 'organisationName']),
  startEnd: compose(formatStartEndString, pick(['startDate', 'endDate'])),
})
