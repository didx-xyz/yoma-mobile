import { path } from 'ramda'

export const selectSkillsFromPayload = path(['payload', 'data', 'data'])
