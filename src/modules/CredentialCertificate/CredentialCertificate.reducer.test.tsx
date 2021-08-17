import { UserCredentialTypes } from 'api/users/users.types'
import { rootStateFixture } from 'redux/redux.test.fixtures'

import SUT, {
  clearCredentialCertificate,
  INITIAL_STATE,
  setCredentialCertificate,
  setCredentialItemId,
} from './CredentialCertificate.reducer'
import { CREDENTIAL_ITEM_MOCK } from './CredentialCertificate.test.fixtures'

describe('modules/CredentialCertificate/CredentialCertificate.reducer', () => {
  describe('setCredentialCertificate', () => {
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
      // when ... we set the setCredentialCertificate
      const action = setCredentialCertificate(mockPayload)
      const result = SUT(mockState, action)

      // then ... validate setCredentialCertificate
      expect(result).toEqual(mockPayload)
    })
  })
  describe('setCredentialItemId', () => {
    it('should set credentialCertificateId from payload', () => {
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

  describe('clearCredentialCertificate', () => {
    it('should clear credentialCertificate state', () => {
      // give ... credentialCertificate in state
      const mockState = rootStateFixture({
        credentialCertificate: CREDENTIAL_ITEM_MOCK,
      })
      //when we clearCredentialCertificate
      const action = clearCredentialCertificate()
      const result = SUT(mockState, action)

      // then ... should set the default CredentialCertificate state
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
