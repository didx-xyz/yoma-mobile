import { path, pipe } from 'ramda'

export const selectUserCredentialsFromLoginPayload = pipe(path(['payload', 'data', 'data', 'user']))
export const selectUserCredentialsFromUpdatePayload = pipe(path(['payload', 'data', 'data']))
export const selectUserIdFromUserCredentials = pipe(path(['user', 'id']))
