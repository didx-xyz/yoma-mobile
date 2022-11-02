import { createSelector } from '@reduxjs/toolkit'

import * as UserSelectors from '~/modules/User/User.selector'

import { FormFields } from './Profile.types'

export default createSelector<any, { user: FormFields }>(
  UserSelectors.selectUser,
  ({ firstName, lastName, email, countryAlpha2, phoneNumber, photoURL }: FormFields) => ({
    user: { firstName, lastName, email, countryAlpha2, phoneNumber, photoURL },
  }),
)
