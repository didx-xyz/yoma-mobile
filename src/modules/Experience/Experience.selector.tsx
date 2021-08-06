import { selectJobEntities } from 'modules/Job/Job.selector'
import 'modules/Skills/Skills.selector'
import { selectFilteredSkills } from 'modules/Skills/Skills.selector'
import { createSelector } from 'reselect'

export default createSelector(selectJobEntities, selectFilteredSkills, (jobEntities, filteredSkills) => ({
  jobs: jobEntities,
  skills: filteredSkills,
}))
