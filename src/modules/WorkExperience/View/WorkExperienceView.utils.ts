import { compose, join, pathOr, pick } from 'ramda'

import { utils as UserUtils } from '~/modules/User'
import { formatStartEndWithDurationString } from '~/utils/dates.utils'

export const getExperienceMetadata = UserUtils.getCredentialViewMetadata({
  organisation: pathOr(null, ['opportunity', 'organisationName']),
  duration: compose(formatStartEndWithDurationString, pick(['startDate', 'endDate'])),
  countries: compose(join(', '), pathOr([], ['opportunity', 'countries'])),
})
