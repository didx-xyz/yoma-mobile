import { curry, filter, mergeRight, pipe, slice, values } from 'ramda'

import { SkillsState } from './Skills.types'

//filter entity by search term else fallback to 20 records as default
export const selectFilterSkillsByTerm = curry(({ searchTerm = '', entities }: SkillsState, minTermLength = 3) => {
  const filtered = pipe(
    values,
    filter((obj: any) => obj.value.indexOf(searchTerm) === 0),
  )(entities)

  return searchTerm.length < minTermLength ? slice(0, 20, filtered) : filtered
})

export const updateStateWithSearchTerm = (state: SkillsState, searchTerm: string) => mergeRight(state, { searchTerm })
