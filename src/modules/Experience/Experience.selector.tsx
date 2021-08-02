import { selectJobEntities } from 'modules/Job/Job.selector'
import { selectOrganisations } from 'modules/Organisations/Organisations.selector'
import { selectSkills } from 'modules/Skills/Skills.selector'
import { createSelector } from 'reselect'

export default createSelector(
  selectJobEntities,
  selectSkills,
  selectOrganisations,
  (jobEntities, skills, organisations) => ({
    jobs: jobEntities,
    skills,
    organisations,
  }),
)
