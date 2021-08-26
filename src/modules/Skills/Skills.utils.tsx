import { curry, filter, map, mergeRight, pipe, slice, values } from 'ramda'

import { FALLBACK_SKILLS_LENGTH, SEARCH_TERM_MIN_LENGTH } from './Skills.constants'
import { SkillsState } from './Skills.types'

export const selectFilterSkillsByTerm = curry(({ searchTerm = '', entities, ids }: SkillsState) => {
  if (searchTerm.length < SEARCH_TERM_MIN_LENGTH) {
    const defaultIds = slice(0, FALLBACK_SKILLS_LENGTH, ids)
    return map((id: string | number) => entities[id], defaultIds)
  }

  return pipe(
    filter((obj: any) => obj.value.indexOf(searchTerm) === 0),
    values,
  )(entities)
})

export const updateStateWithSearchTerm = (state: SkillsState, searchTerm: string) => mergeRight(state, { searchTerm })
