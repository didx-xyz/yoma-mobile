import * as SUT from './redux.utils'

describe('src/utils/redux.utils', () => {
  describe('normalise', () => {
    it('should take a list of objects with an id and return an object with a normalised shape', () => {
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
    it('should take a list of objects with a key and return an object with a normalised shape', () => {
      // given ...
      const data = [
        {
          key: 'key1',
          other: 'OTHER DATA',
        },
        {
          key: 'key2',
          other: 'OTHER OTHER DATA',
        },
      ]
      // when ...
      const result = SUT.normalise(data, 'key')

      // then ...
      expect(result).toEqual({
        entities: {
          key1: {
            key: 'key1',
            other: 'OTHER DATA',
          },
          key2: {
            key: 'key2',
            other: 'OTHER OTHER DATA',
          },
        },
        ids: ['key1', 'key2'],
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
  describe('extractEntitiesFromPayload', () => {
    it('should extract the entities property from payload', () => {
      // given ...
      const action = { type: 'any', payload: { ids: 'DATA', entities: 'ENTITY DATA' } }
      // when ...
      const result = SUT.extractEntitiesFromPayload(action)

      // then ...
      expect(result).toBe('ENTITY DATA')
    })
  })
})
