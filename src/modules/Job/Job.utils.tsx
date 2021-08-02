import { UserCredentialTypes } from 'api/users/users.types'
import { path, pick } from 'ramda'

import { JobCredentialsTmpFormValues, JobPayload } from './Job.types'

//TODO: move to src/utils as normalizePayload
export const extractJobsFromPayload = path(['payload', 'data'])
export const extractJobsCredentialTmpValues = pick(['startTime', 'endTime', 'requestVerification'])
export const prepareJobCredentialPayload = (tmpValues: JobCredentialsTmpFormValues) => (jobPayload: JobPayload) => ({
  type: UserCredentialTypes.Job,
  credentialItemId: jobPayload.id,
  ...tmpValues,
})
