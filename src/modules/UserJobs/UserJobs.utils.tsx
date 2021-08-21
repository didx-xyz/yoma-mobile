import { applySpec, path, pathOr, prop } from 'ramda'

export const extractUserJobsFormValues = applySpec({
  id: path(['job', 'id']),
  title: path(['job', 'title']),
  description: path(['job', 'description']),
  skillNames: pathOr([], ['job', 'skills']),
  organisationId: path(['job', 'organisationId']),
  startTime: prop('startDate'),
  endTime: prop('endDate'),
})
