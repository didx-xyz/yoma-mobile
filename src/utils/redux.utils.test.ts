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
        {
          key: 'id3',
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
          id3: {
            key: 'id3',
            other: 'OTHER OTHER DATA',
          },
        },
        ids: ['id1', 'id2', 'id3'],
      })
    })
  })
  describe('extractDataFromPayload', () => {
    it('should extract the data from a typical response payload', () => {
      // given ...
      const action = { type: 'any', payload: { data: { data: 'DATA' } } }
      // when ...
      const result = SUT.extractDataFromPayload(action)

      // then ...
      expect(result).toBe('DATA')
    })
  })
})
