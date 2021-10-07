import { createSelector } from '@reduxjs/toolkit'

import * as UserSelectors from '~/modules/User/User.selector'

export default createSelector(
  UserSelectors.selectUser,
  ({ firstName, lastName, email, countryAlpha2, phoneNumber, photoURL }) => ({
    user: { firstName, lastName, email, countryAlpha2, phoneNumber, photoURL },
  }),
)
