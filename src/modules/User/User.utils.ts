import { always, applySpec, equals, filter, find, keys, mergeRight, path, pick, pipe, toLower } from 'ramda'
import { StdFn } from 'types/general.types'
import { extractId } from 'utils/redux.utils'

import { UserCredentialTypes } from '../../api/users/users.types'
import { PHOTO_UPLOAD_FORM_NAME } from './User.constants'
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

  photoPayload.append(PHOTO_UPLOAD_FORM_NAME, {
    uri: imageResponse.path,
    name: imageResponse.filename || 'default.jpg',
    type: imageResponse.mime,
  })
  return photoPayload
}

export const extractCredentialsByType = (type: UserCredentialTypes) => filter(pipe(keys, find(equals(toLower(type)))))
export const prepareUserCredentialItemPayload = (action: any): StdFn<any, UserCredentialItemPayload> =>
  mergeRight({
    credentialItemId: extractId(action),
  })

export const extractUserCredentialFormValues = (
  userCredentialType: UserCredentialTypes,
  dateToISOString: StdFn,
): StdFn<any, UserCredentialFormValues> =>
  applySpec({
    type: always(userCredentialType),
    startTime: pipe(path(['payload', 'startTime']), dateToISOString),
    endTime: pipe(path(['payload', 'endTime']), dateToISOString),
    requestVerification: always(false),
  })
