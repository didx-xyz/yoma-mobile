import { equals, filter, find, keys, path, pick, pipe, toLower } from 'ramda'

import { UserCredentialTypes } from '../../api/users/users.types'
import { PHOTO_UPLOAD_FORM_NAME } from './User.constants'

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

export const extractUserCredentialsByType = (type: UserCredentialTypes) =>
  filter(pipe(keys, find(equals(toLower(type)))))
