import 'modules/Skills/Skills.selector'
import { selectFilteredSkills } from 'modules/Skills/Skills.selector'
import { createSelector } from 'reselect'

export default createSelector(selectFilteredSkills, filtered => ({
  skills: filtered,
}))
