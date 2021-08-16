import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './CredentialItems.selector'
import { CREDENTIAL_ITEM_MOCK } from './CredentialItems.test.fixtures'

describe('modules/CredentialItems/CredentialItems.selector', () => {
  describe('selectCredentialItems ', () => {
    it('should return credential items property of the root state', () => {
      const stateMock = rootStateFixture({
        credentialItems: CREDENTIAL_ITEM_MOCK,
      })
      // when ... we call the selector
      const result = SUT.selectCredentialItems(stateMock)
      // then ... should return result as expected
      expect(result).toEqual(CREDENTIAL_ITEM_MOCK)
    })
    it('should return the default user state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectCredentialItems(state)
      // then ... should return result as expected
      expect(result).toEqual(state.credentialItems)
    })
  })
})
