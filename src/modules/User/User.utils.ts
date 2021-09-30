import {
  always,
  applySpec,
  equals,
  filter,
  find,
  keys,
  mergeRight,
  objOf,
  omit,
  path,
  pick,
  pipe,
  prop,
  toLower,
} from 'ramda'

import * as ReduxUtils from '~/redux/redux.utils'

import { types as ApiUserTypes } from '../../api/users'
import * as Types from '../../types/general.types'
import { USER_PHOTO_FORM_DATA_NAME } from './User.constants'
import { UserCredentialFormValues, UserCredentialItemPayload } from './User.types'

export const extractUserFromLoginPayload = path(['payload', 'data', 'data', 'user'])
export const extractUserFromUserUpdateSuccess = path(['payload', 'data', 'data'])
export const extractUserFromUpdateUserPayload = pick([
  'firstName',
  'lastName',
  'phoneNumber',
  'countryAlpha2',
  'biography',
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

export const extractCredentialsByType = (type: ApiUserTypes.UserCredentialTypes) =>
  filter(pipe(keys, find(equals(toLower(type)))))
export const prepareUserCredentialItemPayload = (action: any): Types.StdFn<any, UserCredentialItemPayload> =>
  mergeRight({
    credentialItemId: ReduxUtils.extractId(action),
  })

export const extractUserCredentialFormValues = (
  userCredentialType: ApiUserTypes.UserCredentialTypes,
): Types.StdFn<any, UserCredentialFormValues> =>
  applySpec({
    type: always(userCredentialType),
    startTime: prop('startTime'),
    endTime: prop('endTime'),
    requestVerification: always(false),
  })

export const prepareCreateUserCredentialPayload = (type: ApiUserTypes.UserCredentialTypes) =>
  pipe(omit(['certificate']), mergeRight({ type }))

export const updateStateWithFormValues = (state: Types.StdObj, formValues: UserCredentialFormValues) =>
  pipe(objOf('formValues'), mergeRight(state))(formValues)
