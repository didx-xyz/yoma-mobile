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
  describe('updateStateWithFormValues', () => {
    it('should extract the data from a typical response payload', () => {
      // given ...
      const state = {
        ids: 'Normalised Ids array',
        entities: 'Normalised Entities Object',
      }

      const formValues = 'Temporary Form Object'

      // when ... we updateStateWithFormValues
      // @ts-ignore
      const result = SUT.updateStateWithFormValues(state, formValues)

      // then ...
      expect(result).toEqual({
        ids: 'Normalised Ids array',
        entities: 'Normalised Entities Object',
        formValues: 'Temporary Form Object',
      })
    })
  })
  describe('updateNormalisedState', () => {
    it('should extract the data from a typical response payload', () => {
      // given ...
      const state = {
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
        formValues: {},
      }

      const normalisedUpdate = {
        ids: ['key3'],
        entities: {
          key3: {
            key: 'key3',
            other: 'ANOTHER DATA',
          },
        },
      }

      // when ...
      const result = SUT.updateNormalisedState(state, normalisedUpdate)

      // then ...
      expect(result).toEqual({
        ids: ['key1', 'key2', 'key3'],
        entities: {
          key1: { key: 'key1', other: 'OTHER DATA' },
          key2: { key: 'key2', other: 'OTHER OTHER DATA' },
          key3: { key: 'key3', other: 'ANOTHER DATA' },
        },
        formValues: {},
      })
    })
  })
  describe('selectNormalised', () => {
    it('should return the normalised values from state', () => {
      // given ... an object in the shape of the successful response
      const mockState = {
        formValues: null,
        ids: 'ID',
        entities: 'ENTITIES',
      }

      // when ... we want to extract the data from the rest of the payload
      const result = SUT.selectNormalised(mockState)

      // then ... the data should be extracted correctly
      expect(result).toEqual({ ids: 'ID', entities: 'ENTITIES' })
    })
  })
  describe('extractId', () => {
    it('should return id from payload', () => {
      // given ... an object in the shape of the successful response
      const mockPayload = {
        payload: {
          id: 'ID',
          other: 'OTHER',
        },
      }

      // when ... we want to extract the id from the rest of the payload
      const result = SUT.extractId(mockPayload)

      // then ... the data should be extracted correctly
      expect(result).toEqual('ID')
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
