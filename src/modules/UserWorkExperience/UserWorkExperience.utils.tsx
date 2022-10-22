import { of, pick, pipe } from 'ramda'

export const extractUserWorkExperienceFromData = pipe(
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
    'opportunity',
  ]),
  of,
)
