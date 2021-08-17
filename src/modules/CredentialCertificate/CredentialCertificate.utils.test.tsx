import { UserCredentialTypes } from 'api/users/users.types'

import * as SUT from './CredentialCertificate.utils'

describe('modules/CredentialCertificate/CredentialCertificate.utils', () => {
  describe('extractCredentialItemFromJobFormValues', () => {
    it('should return the default value for the id if none exists', () => {
      // given ...
      const mockPayload = {
        title: 'TITLE',
        description: 'DESCRIPTION',
        organisationId: 'ORGANISATION_ID',
        skillNames: ['SKILL'],
        startTime: 'START_TIME',
        endTime: 'END_TIME',
        requestVerification: false,
      }
      // when ... we get the credentialCertificate
      const result = SUT.extractCredentialItemFromJobFormValues(UserCredentialTypes.Job)(mockPayload)

      // then ... should return credentialCertificate
      expect(result).toEqual({
        type: UserCredentialTypes.Job,
        credentialItemId: null,
        startTime: 'START_TIME',
        endTime: 'END_TIME',
        requestVerification: false,
      })
    })
  })
  describe('extractCredentialItemIdFromPayload', () => {
    it('should return the default value for the id if none exists', () => {
      // given ...
      const mockPayload = {
        payload: {
          id: 'ID',
          title: 'TITLE',
          description: 'DESCRIPTION',
          organisationId: 'ORGANISATION_ID',
          skillNames: ['SKILL'],
          startTime: 'START_TIME',
          endTime: 'END_TIME',
          requestVerification: false,
        },
      }
      // when ... we get the credentialCertificate
      const result = SUT.extractCredentialItemIdFromPayload(mockPayload)

      // then ... should return credentialCertificate
      expect(result).toEqual({
        credentialItemId: 'ID',
      })
    })
  })
})
