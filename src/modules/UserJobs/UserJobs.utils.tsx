import { of, pick, pipe } from 'ramda'

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
    'opportunity',
  ]),
  of,
)
