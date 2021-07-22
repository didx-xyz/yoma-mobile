import { path } from 'ramda'

export const extractOrganisationsFromPayload = path(['payload', 'data', 'data'])
