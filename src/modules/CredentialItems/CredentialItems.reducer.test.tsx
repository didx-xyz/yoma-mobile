import { UserCredentialTypes } from 'api/users/users.types'
import { rootStateFixture } from 'redux/redux.test.fixtures'

import SUT, {
  clearCredentialItem,
  INITIAL_STATE,
  setCredentialItem,
  setCredentialItemId,
} from './CredentialItems.reducer'
import { CREDENTIAL_ITEM_MOCK } from './CredentialItems.test.fixtures'

describe('modules/CredentialItems/CredentialItems.reducer', () => {
  describe('setCredentialItem', () => {
    it('should set credential props from job form values', () => {
      // given ....
      const mockState = rootStateFixture()
      const mockPayload = {
        type: UserCredentialTypes.Assignment,
        credentialItemId: null,
        startTime: 'START_TIME',
        endTime: 'END_TIME',
        requestVerification: false,
      }
      // when ... we set the setCredentialItem
      const action = setCredentialItem(mockPayload)
      const result = SUT(mockState, action)

      // then ... validate setCredentialItem
      expect(result).toEqual(mockPayload)
    })
  })
  describe('setCredentialItemId', () => {
    it('should set credentialItemId from payload', () => {
      // given ....
      const mockState = {
        credentialItemId: null,
        type: UserCredentialTypes.Assignment,
        startTime: 'START_TIME',
        endTime: 'END_TIME',
        requestVerification: false,
      }
      // when ... we set the setCredentialItemId
      const action = setCredentialItemId({ credentialItemId: 'ID' })
      const result = SUT(mockState, action)

      // then ... validate setCredentialItemId
      expect(result).toEqual({
        ...mockState,
        credentialItemId: 'ID',
      })
    })
  })

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
