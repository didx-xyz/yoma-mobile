import { applySpec, compose, isEmpty, pathOr, pick, pipe, reject, values } from 'ramda'

import { formatStartEndString } from '~/utils/dates.utils'

export const getCompletedChallengesMetadata = pipe(
  applySpec({
    organisation: pathOr('', ['challenge', 'organisationName']),
    startEnd: compose(formatStartEndString, pick(['startDate', 'endDate'])),
  }),
  values,
  reject(isEmpty),
)
