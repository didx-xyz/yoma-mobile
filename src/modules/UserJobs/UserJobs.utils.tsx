import { UserCredentialTypes } from 'api/users/users.types'
import { applySpec, path, pick, pipe } from 'ramda'

import { UserJobsCredentialsTmpFormValues, UserJobsPayload } from './UserJobs.types'

export const extractUserJobsId = path(['payload', 'id'])
export const extractUserJobsCredentialTmpFormValues = pipe(
  path(['payload']),
  pick(['credentialId', 'startTime', 'endTime']),
)
export const extractUserJobsCredentialId = path(['payload', 'credentialId'])
export const extractUserJobsCredentialUpdatePayload = applySpec({
  startTime: path(['payload', 'startTime']),
  endTime: path(['payload', 'endTime']),
})
export const extractUserJobsCredentialRequestPayload =
  (tmpFormValues: UserJobsCredentialsTmpFormValues) => (jobPayload: UserJobsPayload) => ({
    type: UserCredentialTypes.Job,
    credentialItemId: jobPayload.id,
    startTime: tmpFormValues.startTime,
    endTime: tmpFormValues.endTime,
    requestVerification: false,
  })
