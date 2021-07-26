import * as SUT from './Organisations.utils'

describe('modules/Organisations/Organisations.utils', () => {
  describe('extractOrganisationsFromPayload', () => {
    it('should return the auth credentials from the login payload', () => {
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
      const result = SUT.extractOrganisationsFromPayload(mockedAction)
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
