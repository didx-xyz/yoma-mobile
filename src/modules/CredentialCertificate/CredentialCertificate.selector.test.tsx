import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './CredentialCertificate.selector'
import { CREDENTIAL_ITEM_MOCK } from './CredentialCertificate.test.fixtures'

describe('modules/CredentialCertificate/CredentialCertificate.selector', () => {
  describe('selectCredentialCertificate ', () => {
    it('should return credential items property of the root state', () => {
      const stateMock = rootStateFixture({
        credentialCertificate: CREDENTIAL_ITEM_MOCK,
      })
      // when ... we call the selector
      const result = SUT.selectCredentialCertificate(stateMock)
      // then ... should return result as expected
      expect(result).toEqual(CREDENTIAL_ITEM_MOCK)
    })
    it('should return the default user state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectCredentialCertificate(state)
      // then ... should return result as expected
      expect(result).toEqual(state.credentialCertificate)
    })
  })
})
