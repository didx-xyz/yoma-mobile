import { createSelector } from '@reduxjs/toolkit'

import { types as DropDownTypes } from '~/components/DropDown'
import { selectors as OrganisationSelectors } from '~/modules/Organisations'

export default createSelector<any, { organisations: DropDownTypes.DropDownItem[] }>(
  [OrganisationSelectors.selectOrganisationsList],
  (organisations: DropDownTypes.DropDownItem[]) => ({ organisations }),
)
