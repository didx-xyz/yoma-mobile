import { selectOrganisations } from 'modules/Organisations/Organisations.selector'
import 'modules/Skills/Skills.selector'
import { selectFilteredSkills } from 'modules/Skills/Skills.selector'
import { createSelector } from 'reselect'

export default createSelector(selectFilteredSkills, selectOrganisations, (filteredSkills, organisations) => ({
  skills: filteredSkills,
  organisations,
}))
