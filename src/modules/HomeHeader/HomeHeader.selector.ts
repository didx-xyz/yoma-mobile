import { createSelector } from '@reduxjs/toolkit'

import { selectPhotoUrl, selectZltoBalance } from '~/modules/User/User.selector'

export default createSelector<any, { zltoBalance: number | undefined; profileImageUrl: string | null }>(
  [selectPhotoUrl, selectZltoBalance],
  (profileImageUrl: string, zltoBalance: number) => ({
    zltoBalance,
    profileImageUrl,
  }),
)
