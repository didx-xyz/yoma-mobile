import { path } from 'ramda'

export const extractErrorResponseMessage = path(['payload', 'data', 'meta', 'message'])
