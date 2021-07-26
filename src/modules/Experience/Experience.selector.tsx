import { createSelector } from '@reduxjs/toolkit'
import * as CredentialsSelectors from 'modules/UserCredentials/UserCredentials.selector'

export default createSelector(CredentialsSelectors.selectCredentials, qualifications => ({
  qualifications,
}))
