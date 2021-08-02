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
        countries: ['COUNTRY'],
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
})
