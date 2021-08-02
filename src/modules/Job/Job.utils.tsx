import { UserCredentialTypes } from 'api/users/users.types'
import { path, pick, pipe } from 'ramda'

import { JobCredentialsTmpFormValues, JobPayload } from './Job.types'

//TODO: move to src/utils as normalizePayload
export const extractJobsFromPayload = path(['payload', 'data'])
export const extractJobsCredentialTmpValues = pipe(path(['payload']), pick(['startTime', 'endTime']))
export const prepareJobCredentialPayload =
  (tmpFormValues: JobCredentialsTmpFormValues) => (jobPayload: JobPayload) => ({
    type: UserCredentialTypes.Job,
    credentialItemId: jobPayload.id,
    requestVerification: false, // TODO: refactor if new organisation is created by the user
    ...tmpFormValues,
  })
