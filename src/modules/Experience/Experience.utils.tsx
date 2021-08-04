import { always, applySpec, path, prop } from 'ramda'

export const extractExperienceFormValues = applySpec({
  id: path(['job', 'id']),
  title: path(['job', 'title']),
  description: path(['job', 'description']),
  language: path(['job', 'language']),
  published: path(['job', 'published']),
  skillNames: always([]),
  organisationId: path(['job', 'organisationId']),
  startTime: prop('startDate'),
  endTime: prop('startDate'),
})
