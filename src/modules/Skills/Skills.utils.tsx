import { curry, filter, isEmpty, mergeRight, pipe, slice, values } from 'ramda'

import { Skill, SkillsState } from './Skills.types'

export const extractFilteredSkillsByValue = curry((value: string, normalisedEntities: Record<any, Skill>) => {
  const filtered = pipe(
    values,
    filter((obj: any) => obj.value.indexOf(value) === 0),
  )(normalisedEntities)

  return isEmpty(value) ? slice(0, 20, filtered) : filtered
})

export const updateSkillsStateWithFiltered = (state: SkillsState, filtered: Skill[]) => mergeRight(state, { filtered })
