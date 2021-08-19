import { UserCredentialTypes } from 'api/users/users.types'

import * as SUT from './UserJobs.utils'

describe('modules/Jobs/Jobs.utils', () => {
  describe('extractJobId', () => {
    it('should return the jobs credentials id from payload', () => {
      // given ... an object in the shape of the successful response
      const mockPayload = {
        payload: {
          id: 'ID',
          other: 'OTHER',
        },
      }

      // when ... we want to extract the id from the rest of the payload
      const result = SUT.extractJobId(mockPayload)

      // then ... the data should be extracted correctly
      expect(result).toEqual('ID')
    })
  })
  describe('extractUserCredentialFormValues', () => {
    it('should return the jobs credentials form values from state', () => {
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
        },
      }

      // when ... we want to extract the data from the rest of the payload
      const result = SUT.extractUserCredentialFormValues(UserCredentialTypes.Job)(mockPayload)

      // then ... the data should be extracted correctly
      expect(result).toEqual({
        type: UserCredentialTypes.Job,
        requestVerification: false,
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      })
    })
  })

  describe('extractUserJobsPayload', () => {
    it('should return the userJobs form values from state', () => {
      // given ...
      const mockPayload = {
        payload: {
          id: 'ID',
          other: 'OTHER',
        },
      }
      const mockFormValues = {
        type: UserCredentialTypes.Job,
        requestVerification: false,
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      }

      // when ... we want to extract the data from the rest of the payload
      const result = SUT.extractUserJobsPayload(mockPayload)(mockFormValues)

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
