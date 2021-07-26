import { path } from 'ramda'

export const extractUserCredentialsFromPayload = path(['payload', 'data'])
