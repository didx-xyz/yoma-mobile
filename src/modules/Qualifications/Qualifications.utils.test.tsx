import * as SUT from './Qualifications.utils'

describe('modules/Qualifications/Qualifications.utils', () => {
  describe('extractQualificationsFromPayload', () => {
    it('should return the qualifications from payload', () => {
      // given ... an object in the shape of the successful response
      const mockedAction = {
        type: 'ACTION',
        payload: {
          data: {
            data: [
              {
                key: 'SOME_KEY',
                value: 'SOME_VALUE',
              },
            ],
          },
        },
      }

      // when ... we want to extract the data from the rest of the payload
      const result = SUT.extractQualificationsFromPayload(mockedAction)
      // then ... the data should be extracted correctly
      expect(result).toEqual([
        {
          key: 'SOME_KEY',
          value: 'SOME_VALUE',
        },
      ])
    })
  })
})
