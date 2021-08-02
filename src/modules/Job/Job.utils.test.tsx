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
          data: mockPayload,
        },
      }

      // when ... we want to extract the data from the rest of the payload
      const result = SUT.extractJobsFromPayload(mockedAction)
      // then ... the data should be extracted correctly
      expect(result).toEqual(mockPayload)
    })
  })
  describe('extractJobsCredentialTmpValues', () => {
    it('should return the jobs credentials form values from state', () => {
      // given ... an object in the shape of the successful response
      const mockPayload = {
        payload: {
          data: 'PAYLOAD DATA',
          meta: 'META DATA',
        },
      }

      // when ... we want to extract the data from the rest of the payload
      const result = SUT.extractJobsFromPayload(mockPayload)

      // then ... the data should be extracted correctly
      expect(result).toEqual('PAYLOAD DATA')
    })
  })
  describe('prepareJobCredentialPayload', () => {
    it('should return the jobs credentials payload', () => {
      // given ... an object in the shape of the successful response
      const mockTmpValues = {
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      }
      const mockResponseData = {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        title: 'string',
        description: 'string',
        createdAt: '2021-08-02T13:24:27.839Z',
        createdByAdmin: true,
        language: 'string',
        published: true,
        skills: ['string'],
      }
      // when ... we want to extract the data for job credential payload
      const result = SUT.prepareJobCredentialPayload(mockTmpValues)(mockResponseData)
      // then ... the data should be extracted correctly
      expect(result).toEqual({
        type: 'Job',
        credentialItemId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      })
    })
  })
})
