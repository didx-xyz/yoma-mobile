import { createSelector } from '@reduxjs/toolkit'

import * as AuthSelectors from '~/modules/Auth/Auth.selector'

export default createSelector(AuthSelectors.selectIsAuthenticated, isAuthorised => ({
  isAuthorised,
}))
