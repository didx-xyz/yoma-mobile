import { UserCredentialTypes } from 'api/users/users.types'

import * as SUT from './UserJobs.utils'

describe('modules/UserJobs/UserJobs.utils', () => {
  describe('extractUserJobsId', () => {
    it('should return the jobs credentials id from payload', () => {
      // given ... an object in the shape of the successful response
      const mockPayload = {
        payload: {
          id: 'ID',
          title: 'TITLE',
          description: 'DESCRIPTION',
          organisationId: 'ORGANISATION_ID',
          skillNames: ['SKILL'],
          startTime: 'START_TIME',
          endTime: 'END_TIME',
          language: 'EN',
          published: false,
        },
      }

      // when ... we want to extract the id from the rest of the payload
      const result = SUT.extractUserJobsId(mockPayload)

      // then ... the data should be extracted correctly
      expect(result).toEqual('ID')
    })
  })
  describe('extractUserJobsCredentialTmpFormValues', () => {
    it('should return the jobs credentials form values from state', () => {
      // given ... an object in the shape of the successful response
      const mockPayload = {
        payload: {
          otherValue: 'OTHER_VALUE',
          startTime: 'START_TIME',
          endTime: 'END_TIME',
        },
      }

      // when ... we want to extract the data from the rest of the payload
      const result = SUT.extractUserJobsCredentialTmpFormValues(mockPayload)

      // then ... the data should be extracted correctly
      expect(result).toEqual({
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      })
    })
  })
  describe('extractUserJobsCredentialId', () => {
    it('should return the jobs credentials id from tmp form values', () => {
      // given ... an object in the shape of the successful response
      const mockPayload = {
        payload: {
          id: 'ID',
          credentialId: 'CREDENTIAL_ID',
          title: 'TITLE',
          description: 'DESCRIPTION',
          organisationId: 'ORGANISATION_ID',
          skillNames: ['SKILL'],
          startTime: 'START_TIME',
          endTime: 'END_TIME',
          language: 'EN',
          published: false,
        },
      }

      // when ... we want to extract the credentialId
      const result = SUT.extractUserJobsCredentialId(mockPayload)
      // then ... the data should be extracted correctly
      expect(result).toEqual('CREDENTIAL_ID')
    })
  })
  describe('extractUserJobsCredentialUpdatePayload', () => {
    it('should return the jobs credentials form values from state', () => {
      // given ... an object in the shape of the successful response
      const mockTmpFormValues = {
        payload: {
          otherValue: 'OTHER_VALUE',
          startTime: 'START_TIME',
          endTime: 'END_TIME',
        },
      }

      // when ... we want to extract the data from the rest of the payload
      const result = SUT.extractUserJobsCredentialUpdatePayload(mockTmpFormValues)

      // then ... the data should be extracted correctly
      expect(result).toEqual({
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      })
    })
  })
  describe('extractUserJobsCredentialRequestPayload', () => {
    it('should return the jobs credentials payload', () => {
      // given ...
      const mockTmpFormValues = {
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      }
      const mockResponseData = {
        id: 'ID',
        title: 'TITLE',
        description: 'DESCRIPTION',
        createdAt: '2021-08-02T13:24:27.839Z',
        createdByAdmin: true,
        language: 'LANGUAGE',
        published: true,
        skills: ['SKILLS'],
      }
      // when ... we want to extract the data for job credential payload
      const result = SUT.extractUserJobsCredentialRequestPayload(mockTmpFormValues)(mockResponseData)
      // then ... the data should be extracted correctly
      expect(result).toEqual({
        type: UserCredentialTypes.Job,
        credentialItemId: 'ID',
        requestVerification: false,
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      })
    })
  })
})
