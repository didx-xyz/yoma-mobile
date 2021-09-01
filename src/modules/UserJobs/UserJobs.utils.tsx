import { applySpec, of, path, pathOr, pick, pipe, prop } from 'ramda'

export const extractUserJobsFormValues = applySpec({
  id: path(['job', 'id']),
  title: path(['job', 'title']),
  description: path(['job', 'description']),
  skillNames: pathOr([], ['job', 'skills']),
  organisationId: path(['job', 'organisationId']),
  startTime: prop('startDate'),
  endTime: prop('endDate'),
})

export const extractUserJobFromData = pipe(
  pick([
    'id',
    'verifiedAt',
    'approved',
    'approvalMessage',
    'startDate',
    'endDate',
    'createdAt',
    'fileId',
    'fileURL',
    'requestVerification',
    'job',
  ]),
  of,
)
