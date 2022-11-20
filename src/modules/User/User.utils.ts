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
  pathOr,
  pick,
  pipe,
  prop,
  propOr,
  reject,
  toLower,
  values,
} from 'ramda'

import { types as ApiUserTypes } from '~/api/users'
import * as ReduxTypes from '~/redux/redux.types'
import * as ReduxUtils from '~/redux/redux.utils'
import * as Types from '~/types/general.types'
import { renameKeys, safeWhen } from '~/utils/ramda.utils'

import { USER_PHOTO_FORM_DATA_NAME } from './User.constants'
import { CredentialTypes, UserCredentialFormValues, UserCredentialItemPayload, UserFields } from './User.types'

export const extractUserFromPayload = pipe(
  path(['payload', 'data']),
  renameKeys({ sub: 'id', family_name: 'lastName', given_name: 'firstName' }),
)

export const extractUserFromUserUpdateSuccess = path(['payload', 'data', 'data'])

export const extractUserFromUpdateUserPayload = pick([
  UserFields.Firstname,
  UserFields.Lastname,
  UserFields.PhoneNumber,
  UserFields.Country,
  UserFields.Biography,
  UserFields.Email,
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

export const filterCredentials = (type: CredentialTypes) => pipe(keys, find(pipe(toLower, equals(toLower(type)))))

export const extractUserCredentials = (type: CredentialTypes) => filter(filterCredentials(type))

export const filterOpportunityCredentials = (type: CredentialTypes) =>
  safeWhen(has(CredentialTypes.Opportunity), pathEq([CredentialTypes.Opportunity, 'type'], type))

export const extractUserOpportunityCredentials = (type: CredentialTypes) => filter(filterOpportunityCredentials(type))

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

export const getUserCredentialWidgetSelectorSpec = (cred: CredentialTypes) => ({
  title: pathOr('', [cred, 'title']),
  startDate: propOr('', 'startDate'),
  organisationLogoURL: path([cred, 'organisationLogoURL']),
  isValidated: propOr(false, 'approved'),
})

export const getUserCredentialViewSelectorSpec = (cred: CredentialTypes) => ({
  title: pathOr('', [cred, 'title']),
  description: pathOr('', [cred, 'description']),
  iconUrl: path([cred, 'organisationLogoURL']),
  isValidated: propOr(false, 'approved'),
})
