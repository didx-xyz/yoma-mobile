import { path } from 'ramda'

//TODO: move to src/utils as normalizePayload
export const extractQualificationsFromPayload = path(['payload', 'data', 'data'])
