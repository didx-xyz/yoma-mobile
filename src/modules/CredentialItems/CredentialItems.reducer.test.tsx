import { rootStateFixture } from 'redux/redux.test.fixtures'

import SUT, { clearCredentialItem, INITIAL_STATE } from './CredentialItems.reducer'
import { CREDENTIAL_ITEM_MOCK } from './CredentialItems.test.fixtures'

describe('modules/CredentialItems/CredentialItems.reducer', () => {
  describe('clearCredentialItem', () => {
    it('should clear credentialItem state', () => {
      // give ... credentialItems in state
      const mockState = rootStateFixture({
        credentialItems: CREDENTIAL_ITEM_MOCK,
      })
      //when we clearCredentialItems
      const action = clearCredentialItem()
      const result = SUT(mockState, action)

      // then ... should set the default CredentialItems state
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
