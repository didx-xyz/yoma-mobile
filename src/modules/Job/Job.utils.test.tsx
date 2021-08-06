import * as SUT from './Job.utils'

describe('modules/Jobs/Jobs.utils', () => {
  describe('extractJobId', () => {
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
      const result = SUT.extractJobId(mockPayload)

      // then ... the data should be extracted correctly
      expect(result).toEqual('ID')
    })
  })
  describe('extractJobsCredentialTmpFormValues', () => {
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
      const result = SUT.extractJobsCredentialTmpFormValues(mockPayload)

      // then ... the data should be extracted correctly
      expect(result).toEqual({
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      })
    })
  })
  describe('extractJobCredentialId', () => {
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
      const result = SUT.extractJobCredentialId(mockPayload)
      // then ... the data should be extracted correctly
      expect(result).toEqual('CREDENTIAL_ID')
    })
  })
  describe('extractJobCredentialUpdatePayload', () => {
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
      const result = SUT.extractJobCredentialUpdatePayload(mockTmpFormValues)

      // then ... the data should be extracted correctly
      expect(result).toEqual({
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      })
    })
  })
  describe('extractJobCredentialRequestPayload', () => {
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
      const result = SUT.extractJobCredentialRequestPayload(mockTmpFormValues)(mockResponseData)
      // then ... the data should be extracted correctly
      expect(result).toEqual({
        type: 'Job',
        credentialItemId: 'ID',
        requestVerification: false,
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      })
    })
  })
})
