import { UserCredentialTypes } from 'api/users/users.types'
import { path, pick, pipe } from 'ramda'

import { JobCredentialsTmpFormValues, JobPayload } from './Job.types'

//TODO: move to src/utils as normalizePayload
export const extractJobsFromPayload = path(['payload', 'data', 'data'])
export const extractJobsCredentialTmpFormValues = pipe(path(['payload']), pick(['startTime', 'endTime']))
export const extractJobCredentialRequestPayload =
  (tmpFormValues: JobCredentialsTmpFormValues) => (jobPayload: JobPayload) => ({
    type: UserCredentialTypes.Job,
    credentialItemId: jobPayload.id,
    requestVerification: false, // TODO: refactor - add to 'tmpFormValues' if new organisation is created
    ...tmpFormValues,
  })
