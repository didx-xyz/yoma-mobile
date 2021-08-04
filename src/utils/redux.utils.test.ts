import * as SUT from './redux.utils'

describe('src/utils/redux.utils', () => {
  describe('normalise', () => {
    it('should take a list of objects with an id key and return an object with a normalised shape', () => {
      // given ...
      const data = [
        {
          id: 'id1',
          other: 'OTHER DATA',
        },
        {
          id: 'id2',
          other: 'OTHER OTHER DATA',
        },
      ]
      // when ...
      const result = SUT.normalise(data)

      // then ...
      expect(result).toEqual({
        entities: {
          id1: {
            id: 'id1',
            other: 'OTHER DATA',
          },
          id2: {
            id: 'id2',
            other: 'OTHER OTHER DATA',
          },
        },
        ids: ['id1', 'id2'],
      })
    })
  })
  describe('extractPayloadData', () => {
    it('should return data from successful payload', () => {
      // given ... the auth success response
      const credentials = {
        payload: {
          data: {
            data: {
              someKey: 'RESPONSE',
            },
          },
        },
      }
      // when extractUserFromLoginPayload
      const result = SUT.extractPayloadData(credentials)
      //then expect user response data
      expect(result).toEqual({
        someKey: 'RESPONSE',
      })
    })
  })
})
