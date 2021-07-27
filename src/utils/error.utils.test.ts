import * as SUT from './error.utils'

describe('modules/utils/error.utils', () => {
  describe('extractErrorMessageFromPayload', () => {
    it('should return the error message from payload', () => {
      // given ... an object in the shape of the failure response
      const mockedAction = {
        type: 'ACTION',
        payload: {
          data: {
            meta: {
              success: true,
              code: 'NUMBER',
              message: 'ERROR_MESSAGE',
            },
          },
        },
      }

      // when ... we want to extract the data from the rest of the payload
      const result = SUT.extractErrorMessageFromPayload(mockedAction)
      // then ... the data should be extracted correctly
      expect(result).toEqual('ERROR_MESSAGE')
    })
  })
})
