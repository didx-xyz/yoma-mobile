import { applySpec, compose, isEmpty, join, pathOr, pick, pipe, reject, values } from 'ramda'

import { formatStartEndWithDurationString } from '../../../utils/dates.utils'

export const getExperienceMetadata = pipe(
  applySpec({
    organisation: pathOr(null, ['job', 'organisationName']),
    duration: compose(formatStartEndWithDurationString, pick(['startDate', 'endDate'])),
    countries: compose(join(', '), pathOr([], ['job', 'countries'])),
  }),
  values,
  reject(isEmpty),
)
