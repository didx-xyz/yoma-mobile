import { userStateFixture } from '~/modules/User/User.fixture'
import { rootStateFixture } from '~/redux/redux.fixture'

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
  describe('updateNormalisedReducer', () => {
    it('should add a normalised item to an already normalised state', () => {
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

      const action = {
        type: 'ANY ACTION',
        payload: {
          ids: ['key3'],
          entities: {
            key3: {
              key: 'key3',
              other: 'ANOTHER DATA',
            },
          },
        },
      }

      // when ...
      // @ts-ignore - we don't need to mock exact state endpoints to test this
      const result = SUT.updateNormalisedReducer(state, action)

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
    it('should update an existing item in a normalised state', () => {
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
            extra: 'EXTRA DATA',
          },
        },
        ids: ['key1', 'key2'],
      }

      const action = {
        type: 'ANY ACTION',
        payload: {
          ids: ['key2'],
          entities: {
            key2: {
              key: 'key2',
              other: 'ANOTHER DATA',
            },
          },
        },
      }

      // when ...
      // @ts-ignore - we don't need to mock exact state endpoints to test this
      const result = SUT.updateNormalisedReducer(state, action)

      // then ...
      expect(result).toEqual({
        ids: ['key1', 'key2'],
        entities: {
          key1: { key: 'key1', other: 'OTHER DATA' },
          key2: { key: 'key2', other: 'ANOTHER DATA', extra: 'EXTRA DATA' },
        },
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
      const result = SUT.extractIdFromAction(mockPayload)

      // then ... the data should be extracted correctly
      expect(result).toEqual('ID')
    })
  })
  describe('extractDataFromResponseAction', () => {
    it('should extract the data from a typical response payload', () => {
      // given ...
      const action = { type: 'any', payload: { data: { data: 'DATA' } } }
      // when ...
      const result = SUT.extractDataFromResponseAction(action)

      // then ...
      expect(result).toBe('DATA')
    })
  })
  describe('extractEntitiesFromNormalisedAction', () => {
    it('should extract the entities property from payload', () => {
      // given ...
      const action = { type: 'any', payload: { ids: 'DATA', entities: 'ENTITY DATA' } }
      // when ...
      const result = SUT.extractEntitiesFromNormalisedAction(action)

      // then ...
      expect(result).toBe('ENTITY DATA')
    })
  })
  describe('buildConfig', () => {
    it('should extract the entities property from payload', () => {
      // given ...
      const stateMock = rootStateFixture({
        user: userStateFixture({ id: 'USER ID' }),
      })
      const configMock = { key: 'SOME VALUE', endpoint: 'SOME VALUE' }
      // when ...
      const result = SUT.buildConfig(configMock, stateMock)

      // then ...
      expect(result).toEqual({
        key: 'SOME VALUE',
        endpoint: ['USER ID', 'SOME VALUE'],
      })
    })
  })
})
