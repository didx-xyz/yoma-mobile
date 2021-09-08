import { createSelector } from '@reduxjs/toolkit'

import * as userSelectors from '../../User/User.selector'

export default createSelector(userSelectors.selectBiography, biography => ({
  biography,
}))
