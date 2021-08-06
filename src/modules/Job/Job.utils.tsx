import { UserCredentialTypes } from 'api/users/users.types'
import { applySpec, path, pick, pipe } from 'ramda'

import { JobCredentialsTmpFormValues, JobPayload } from './Job.types'

export const extractJobId = path(['payload', 'id'])
export const extractJobsCredentialTmpFormValues = pipe(
  path(['payload']),
  pick(['credentialId', 'startTime', 'endTime']),
)
export const extractJobCredentialId = path(['payload', 'credentialId'])
export const extractJobCredentialUpdatePayload = applySpec({
  startTime: path(['payload', 'startTime']),
  endTime: path(['payload', 'endTime']),
})
export const extractJobCredentialRequestPayload =
  (tmpFormValues: JobCredentialsTmpFormValues) => (jobPayload: JobPayload) => ({
    type: UserCredentialTypes.Job,
    credentialItemId: jobPayload.id,
    startTime: tmpFormValues.startTime,
    endTime: tmpFormValues.endTime,
    requestVerification: false,
  })
