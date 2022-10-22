import { compose, join, pathOr, pick } from 'ramda'

import { getCredentialViewMetadata } from '~/modules/User/User.utils'
import { formatStartEndWithDurationString } from '~/utils/dates.utils'

export const getExperienceMetadata = getCredentialViewMetadata({
  organisation: pathOr(null, ['opportunity', 'organisationName']),
  duration: compose(formatStartEndWithDurationString, pick(['startDate', 'endDate'])),
  countries: compose(join(', '), pathOr([], ['opportunity', 'countries'])),
})
