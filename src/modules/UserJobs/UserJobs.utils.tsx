import { applySpec, path, pathOr, prop } from 'ramda'

export const extractUserJobsFormValues = applySpec({
  id: path(['job', 'id']),
  credentialId: path(['id']),
  title: path(['job', 'title']),
  description: path(['job', 'description']),
  language: path(['job', 'language']),
  published: path(['job', 'published']),
  skillNames: pathOr([], ['job', 'skills']),
  organisationId: path(['job', 'organisationId']),
  startTime: prop('startDate'),
  endTime: prop('endDate'),
})
