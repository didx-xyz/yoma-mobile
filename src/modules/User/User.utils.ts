import { path, pick } from 'ramda'

export const extractUserFromLoginPayload = path(['payload', 'data', 'data', 'user'])
export const extractUserFromUserUpdateSuccess = path(['payload', 'data', 'data'])
export const extractUserPatchPayload = pick(['firstName', 'lastName', 'phoneNumber', 'countryAlpha2', 'biography'])
