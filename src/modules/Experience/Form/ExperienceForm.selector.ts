import { createSelector } from '@reduxjs/toolkit'

import { types as DropDownTypes } from '~/components/DropDown'
import { selectors as OrganisationsSelectors } from '~/modules/Organisations'

export default createSelector<any, { organisations: DropDownTypes.DropDownItem[] }>(
  [OrganisationsSelectors.selectOrganisationsList],
  (organisations: DropDownTypes.DropDownItem[]) => ({
    organisations,
  }),
)
