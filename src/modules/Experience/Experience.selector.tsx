import { selectOrganisations } from 'modules/Organisations/Organisations.selector'
import { selectQualifications } from 'modules/Qualifications/Qualifications.selector'
import { selectSkills } from 'modules/Skills/Skills.selector'
import { createSelector } from 'reselect'

export default createSelector(
  selectQualifications,
  selectSkills,
  selectOrganisations,
  (qualifications, skills, organisations) => ({
    qualifications,
    skills,
    organisations,
  }),
)
