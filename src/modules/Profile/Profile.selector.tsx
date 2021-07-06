import { createSelector } from '@reduxjs/toolkit'
import * as UserSelectors from 'modules/User/User.selector'

//TODO: select user props needed for profile component
export default createSelector(UserSelectors.selectUser, user => ({
  user,
}))
