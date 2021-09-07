import { createSelector } from '@reduxjs/toolkit'

import * as OrganisationsSelectors from '../../Organisations/Organisations.selector'
import * as SkillsSelectors from '../../Skills/Skills.selector'

export default createSelector(
  OrganisationsSelectors.selectOrganisationsList,
  SkillsSelectors.selectFiltered,
  (organisations, skills) => ({
    organisations,
    skills,
  }),
)
