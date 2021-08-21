import { filter, map, mergeRight, pipe, prop, values } from 'ramda'

import { Skill, SkillsState } from './Skills.types'

export const extractFilteredSkillsByValue = (name: string = ' ', entities: Record<any, Skill>) =>
  pipe(
    values,
    filter((el: any) => el.value?.indexOf(name) === 0),
    map(prop('value')),
  )(entities)
export const updateSkillsStateWithFiltered = (state: SkillsState, filtered: String[]) => mergeRight(state, { filtered })
