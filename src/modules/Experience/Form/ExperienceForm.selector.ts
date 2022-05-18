import { createSelector } from '@reduxjs/toolkit'

import { selectors as OrganisationsSelectors } from '~/modules/Organisations'

export default createSelector(OrganisationsSelectors.selectOrganisationsList, organisations => ({
  organisations,
}))
