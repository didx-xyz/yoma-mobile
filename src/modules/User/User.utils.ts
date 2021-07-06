import { path, pipe } from 'ramda'

export const selectUserFromLoginPayload = pipe(path(['payload', 'data', 'data', 'user']))
