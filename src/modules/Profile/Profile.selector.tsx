import { createSelector } from '@reduxjs/toolkit'
import * as UserSelectors from 'modules/User/User.selector'

export default createSelector(UserSelectors.selectUserState, user => ({
  user,
}))
