import { createSelector } from '@reduxjs/toolkit'

import { selectors as OrganisationSelectors } from '../../Organisations'
import { selectors as SkillsSelectors } from '../../Skills'

export default createSelector(
  [OrganisationSelectors.selectOrganisationsList, SkillsSelectors.selectFiltered],
  (organisations, skills) => {
    return { organisations, skills }
  },
)
