import { UserCredentialTypes } from 'api/users/users.types'
import { UserCredentialItemPayload } from 'modules/User/User.types'
import { always, applySpec, merge, path } from 'ramda'
import { StdFn } from 'types/general.types'

import { UserJobsFormValues } from './UserJobs.types'

export const extractJobId = path(['payload', 'id'])

export const extractUserJobsPayload = (action: any): StdFn<any, UserCredentialItemPayload> =>
  merge({
    credentialItemId: extractJobId(action),
  })

export const extractUserCredentialFormValues = (
  userCredentialType: UserCredentialTypes,
): StdFn<any, UserJobsFormValues> =>
  applySpec({
    type: always(userCredentialType),
    startTime: path(['payload', 'startTime']),
    endTime: path(['payload', 'endTime']),
    requestVerification: always(false),
  })
