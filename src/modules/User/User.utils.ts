import { path } from 'ramda'

export const extractUserFromLoginPayload = path(['payload', 'data', 'data', 'user'])
export const extractUserFromUserUpdateSuccess = path(['payload', 'data', 'data'])
