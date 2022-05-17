import { createSelector } from '@reduxjs/toolkit'

import { selectors as OrganisationSelectors } from '~/modules/Organisations'

export default createSelector([OrganisationSelectors.selectOrganisationsList], organisations => {
  return { organisations }
})
