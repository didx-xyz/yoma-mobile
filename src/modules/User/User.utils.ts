import {
  always,
  applySpec,
  equals,
  filter,
  find,
  has,
  isEmpty,
  keys,
  mergeRight,
  omit,
  path,
  pathEq,
  pick,
  pipe,
  prop,
  reject,
  toLower,
  values,
} from 'ramda'

import { constants as ApiUserConstants, types as ApiUserTypes } from '~/api/users'
import * as ReduxTypes from '~/redux/redux.types'
import * as ReduxUtils from '~/redux/redux.utils'
import * as Types from '~/types/general.types'
import { renameKeys, safeWhen } from '~/utils/ramda.utils'

import { USER_PHOTO_FORM_DATA_NAME } from './User.constants'
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

// legacy, and currently unused.
export const filterRootCredentials = (type: ApiUserTypes.UserCredentialTypes) => pipe(keys, find(equals(toLower(type))))
export const filterOpportunityCredentials = (type: ApiUserTypes.UserCredentialTypes) =>
  safeWhen(
    has('opportunity'),
    pathEq(['opportunity', 'type'], ApiUserConstants.USER_CREDENTIAL_OPPORTUNITY_TYPES_MAP[type]),
  )

type ExtractUserCredentialsFilter = typeof filterRootCredentials | typeof filterOpportunityCredentials

export const extractUserCredentials = (
  type: ApiUserTypes.UserCredentialTypes,
  filterFn: ExtractUserCredentialsFilter,
) => filter(filterFn(type))

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
