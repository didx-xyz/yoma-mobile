import { path } from 'ramda'

export const selectUserFromLoginPayload = path(['payload', 'data', 'data', 'user'])
