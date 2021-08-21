import { createSelector } from '@reduxjs/toolkit'

import { selectPhotoUrl, selectZltoBalance } from '../User/User.selector'

export default createSelector([selectPhotoUrl, selectZltoBalance], (profileImageUrl, zltoBalance) => {
  return {
    zltoBalance,
    profileImageUrl,
  }
})
