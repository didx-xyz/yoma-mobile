import { createSelector } from '@reduxjs/toolkit'

import { selectors as userSelectors } from '~/modules/User'

export default createSelector<any, { biography: string }>(userSelectors.selectBiography, (biography: string) => ({
  biography,
}))
