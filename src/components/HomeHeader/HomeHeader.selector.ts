import { createSelector } from '@reduxjs/toolkit'

import { selectUser } from '../../modules/User/User.selector'

export default createSelector(selectUser, user => {
  return {
    zltoBalance: user.zltoBalance,
    profileImageUrl: user.photoURL,
  }
})
