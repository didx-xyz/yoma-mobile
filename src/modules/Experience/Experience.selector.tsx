import { createSelector } from '@reduxjs/toolkit'
import * as CredentialsSelectors from 'modules/Credentials/Credentials.selector'

export default createSelector(CredentialsSelectors.selectCredentials, credentials => ({
  credentials,
}))
