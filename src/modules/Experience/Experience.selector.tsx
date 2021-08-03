import { selectJobEntities } from 'modules/Job/Job.selector'
import { selectOrganisations } from 'modules/Organisations/Organisations.selector'
import 'modules/Skills/Skills.selector'
import { selectFilteredSkills } from 'modules/Skills/Skills.selector'
import { createSelector } from 'reselect'

export default createSelector(
  selectJobEntities,
  selectFilteredSkills,
  selectOrganisations,
  (jobEntities, filteredSkills, organisations) => ({
    jobs: jobEntities,
    skills: filteredSkills,
    organisations,
  }),
)
