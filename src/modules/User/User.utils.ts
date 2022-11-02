import {
  always,
  applySpec,
  filter,
  has,
  isEmpty,
  mergeRight,
  omit,
  path,
  pathEq,
  pick,
  pipe,
  prop,
  reject,
  values,
} from 'ramda'

import { types as ApiUserTypes } from '~/api/users'
import * as ReduxTypes from '~/redux/redux.types'
import * as ReduxUtils from '~/redux/redux.utils'
import * as Types from '~/types/general.types'
import { renameKeys, safeWhen } from '~/utils/ramda.utils'

import { USER_CREDENTIAL_TYPES_MAP, USER_PHOTO_FORM_DATA_NAME } from './User.constants'
import { UserCredentialFormValues, UserCredentialItemPayload } from './User.types'

export const extractUserFromPayload = pipe(
  path(['payload', 'data']),
  renameKeys({ sub: 'id', family_name: 'lastName', given_name: 'firstName' }),
)

export const extractUserFromUserUpdateSuccess = path(['payload', 'data', 'data'])
export const extractUserFromUpdateUserPayload = pick([
  'firstName',
  'lastName',
  'phoneNumber',
  'countryAlpha2',
  'biography',
  'email',
])

export const createPhotoFormPayload = (formInstance: any) => (imageResponse: any) => {
  const photoPayload = new formInstance()

  photoPayload.append(USER_PHOTO_FORM_DATA_NAME, {
    uri: imageResponse.path,
    name: imageResponse.filename || 'default.jpg',
    type: imageResponse.mime,
  })
  return photoPayload
}

export const filterOpportunityCredentials = (type: ApiUserTypes.UserCredentialTypes) =>
  safeWhen(has('opportunity'), pathEq(['opportunity', 'type'], USER_CREDENTIAL_TYPES_MAP[type]))

export const extractUserCredentials = (type: ApiUserTypes.UserCredentialTypes) =>
  filter(filterOpportunityCredentials(type))

export const prepareUserCredentialItemPayload = (action: any): Types.StdFn<any, UserCredentialItemPayload> =>
  mergeRight({
    credentialItemId: ReduxUtils.extractIdFromAction(action),
  })

export const extractUserCredentialFormValues = (
  userCredentialType: ApiUserTypes.UserCredentialTypes,
): Types.StdFn<any, UserCredentialFormValues> =>
  applySpec({
    type: always(userCredentialType),
    startTime: prop('startTime'),
    endTime: prop('endTime'),
    requestVerification: always(false),
    certificate: prop('certificate'),
  })

export const prepareCreateUserCredentialPayload = (type: ApiUserTypes.UserCredentialTypes) =>
  pipe(omit(['certificate']), mergeRight({ type }))

export const setFormValues = (state: ReduxTypes.NormalisedData, formValues: Types.StdObj) =>
  Object.assign(state, { formValues })

export const getCredentialViewMetadata = (spec: Record<string, any>) => pipe(applySpec(spec), values, reject(isEmpty))
