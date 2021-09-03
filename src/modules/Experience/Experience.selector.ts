import { createSelector } from '@reduxjs/toolkit'

import * as OrganisationsSelectors from '../Organisations/Organisations.selector'
import * as SkillsSelectors from '../Skills/Skills.selector'
import { selectUserJobItems } from '../UserJobs/UserJobs.selector'

export default createSelector(
  selectUserJobItems,
  OrganisationsSelectors.selectOrganisationsList,
  SkillsSelectors.selectFiltered,
  (userJobs, organisations, skills) => ({
    userJobs,
    organisations,
    skills,
  }),
)
