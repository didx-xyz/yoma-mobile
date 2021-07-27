import { path } from 'ramda'

export const extractQualificationsFromPayload = path(['payload', 'data', 'data'])
