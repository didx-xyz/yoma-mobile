import { UserCredentialTypes } from 'api/users/users.types'

import { createFixture } from '../../../tests/tests.utils'
import { CredentialItem } from './CredentialItems.types'

export const CREDENTIAL_ITEM_MOCK: CredentialItem = {
  type: UserCredentialTypes.Job,
  credentialItemId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  startTime: '2021-07-16T06:15:14.043Z',
  endTime: '2021-08-16T06:15:14.043Z',
  requestVerification: true,
}
export const credentialItemFixture = createFixture(CREDENTIAL_ITEM_MOCK)
