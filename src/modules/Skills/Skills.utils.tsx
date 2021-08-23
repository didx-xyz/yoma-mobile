import { curry, filter, isEmpty, mergeRight, pipe, slice, values } from 'ramda'

import { SkillsState } from './Skills.types'

export const extractFilteredSkillsByValue = curry(({ searchTerm, entities }: SkillsState) => {
  const filtered = pipe(
    values,
    filter((obj: any) => obj.value.indexOf(searchTerm) === 0),
  )(entities)

  return isEmpty(searchTerm) ? slice(0, 20, filtered) : filtered
})

export const updateStateWithSearchTerm = (state: SkillsState, searchTerm: string) => mergeRight(state, { searchTerm })
