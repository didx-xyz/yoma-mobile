import { path } from 'ramda'

export const extractErrorMessageFromPayload = path(['payload', 'data', 'meta', 'message'])
