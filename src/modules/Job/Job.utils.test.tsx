import * as SUT from './Job.utils'

describe('modules/Jobs/Jobs.utils', () => {
  describe('extractJobsFromPayload', () => {
    it('should return the jobs from payload', () => {
      // given ... an object in the shape of the successful response
      const mockPayload = {
        skillNames: ['SKILL'],
        title: 'TITLE',
        description: 'DESCRIPTION',
        organisationId: 'ORGANISATION_ID',
        language: 'EN',
        startTime: '2021-07-04T10:45:00Z',
        endTime: '2021-07-18T10:45:00Z',
        published: false,
      }
      const mockedAction = {
        type: 'ACTION',
        payload: {
          data: {
            data: mockPayload,
          },
        },
      }

      // when ... we want to extract the data from the rest of the payload
      const result = SUT.extractJobsFromPayload(mockedAction)
      // then ... the data should be extracted correctly
      expect(result).toEqual(mockPayload)
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
  describe('prepareJobCredentialPayload', () => {
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
      const result = SUT.prepareJobCredentialPayload(mockTmpFormValues)(mockResponseData)
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
