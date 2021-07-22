import { createSelector } from '@reduxjs/toolkit'

import { selectors as userSelectors } from '../User'

export default createSelector(userSelectors.selectBiography, biography => ({
  biography,
}))
