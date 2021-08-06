import { path } from 'ramda'

export const extractSkillsFromPayload = path(['payload', 'data', 'data'])
