import { applySpec, compose, isEmpty, join, path, pathOr, pick, pipe, prop, reject, values } from 'ramda'

import { formatStartEndWithDurationString } from '../../utils/dates.utils'

export const extractUserJobsFormValues = applySpec({
  id: path(['job', 'id']),
  title: path(['job', 'title']),
  description: path(['job', 'description']),
  skillNames: pathOr([], ['job', 'skills']),
  organisationId: path(['job', 'organisationId']),
  startTime: prop('startDate'),
  endTime: prop('endDate'),
})

export const getExperienceMetadata = pipe(
  applySpec({
    organisation: pathOr(null, ['job', 'organisationName']),
    duration: compose(formatStartEndWithDurationString, pick(['startDate', 'endDate'])),
    countries: compose(join(', '), pathOr([], ['job', 'countries'])),
  }),
  values,
  reject(isEmpty),
)
