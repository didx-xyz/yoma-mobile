import { path, pipe } from 'ramda'

export const selectUserFromLoginPayload = pipe(path(['payload', 'data', 'data', 'user']))
export const extractUserFromUserUpdateSuccess = pipe(path(['payload', 'data', 'data']))
export const selectUserId = pipe(path(['user', 'id']))
