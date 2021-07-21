import { path } from 'ramda'

export const selectOrganisationsFromPayload = path(['payload', 'data', 'data'])
