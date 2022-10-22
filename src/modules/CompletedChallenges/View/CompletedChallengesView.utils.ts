import { compose, pathOr, pick } from 'ramda'

import { getCredentialViewMetadata } from '~/modules/User/User.utils'
import { formatStartEndString } from '~/utils/dates.utils'

export const getCompletedChallengesMetadata = getCredentialViewMetadata({
  organisation: pathOr('', ['opportunity', 'organisationName']),
  startEnd: compose(formatStartEndString, pick(['startDate', 'endDate'])),
})
