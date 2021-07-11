import { createSelector } from '@reduxjs/toolkit'

import * as AuthSelectors from '../Auth/Auth.selector'

export default createSelector(AuthSelectors.selectIsAuthenticated, isAuthorised => ({
  isAuthorised,
}))
