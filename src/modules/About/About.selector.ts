import { createSelector } from '@reduxjs/toolkit'

import * as userSelectors from '../User/User.selector'

export default createSelector<any, { biography: string }>(userSelectors.selectBiography, (biography: string) => ({
  biography,
}))
