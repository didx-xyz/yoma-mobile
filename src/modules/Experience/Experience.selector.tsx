import { createSelector } from '@reduxjs/toolkit'
import * as CredentialsSelectors from 'modules/UserCredentials/UserCredentials.selector'

export default createSelector(CredentialsSelectors.selectUserCredentials, qualifications => ({
  qualifications,
}))
