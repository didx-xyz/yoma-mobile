import { path, pipe } from 'ramda'

export const selectUserCredentialsFromLoginPayload = pipe(path(['payload', 'data', 'data', 'user']))
