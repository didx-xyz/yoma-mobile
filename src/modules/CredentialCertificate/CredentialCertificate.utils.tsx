import { UserCredentialTypes } from 'api/users/users.types'
import { always, applySpec, path, prop } from 'ramda'

export const extractCredentialItemFromJobFormValues = (userCredentialTypes: UserCredentialTypes) =>
  applySpec({
    type: always(userCredentialTypes),
    credentialItemId: always(null),
    startTime: prop('startTime'),
    endTime: prop('endTime'),
    requestVerification: prop('requestVerification'),
  })

export const extractCredentialItemIdFromPayload = applySpec({
  credentialItemId: path(['payload', 'id']),
})
