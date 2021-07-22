import { path, pick } from 'ramda'

import { PhotoUploadFormConfig } from './User.types'

export const extractUserFromLoginPayload = path(['payload', 'data', 'data', 'user'])
export const extractUserFromUserUpdateSuccess = path(['payload', 'data', 'data'])
export const extractUserfromUpdateUserPayload = pick([
  'firstName',
  'lastName',
  'phoneNumber',
  'countryAlpha2',
  'biography',
])

export const createPhotoFormPayload = (imageResponse: any, formConfig: PhotoUploadFormConfig) => {
  let photoPayload = formConfig.formInstance
  photoPayload.append(formConfig.formName, {
    uri: imageResponse.path,
    name: imageResponse.filename || 'default.jpg',
    type: imageResponse.mime,
  })
  return photoPayload
}
