import * as SUT from './api.utils'

describe('api/api.utils', () => {
  describe('generateEndpoint', () => {
    it.each([
      [['user', 'cred'], 'user/cred'],
      [['test', '123'], 'test/123'],
    ])('should behave same as array added with / ', (values, expected) => {
      const result = SUT.generateEndpoint(values)
      expect(result).toBe(expected)
    })
  })
  describe('addValueWithGivenKeyToConfig', () => {
    it('should add a key value pair to the provided config when we provide a key and a value, given we have a default config object', () => {
      // given ... given we have a default config object
      const config = {
        aKey: 'aValue',
        anotherKey: 'anotherValue',
      }
      // when ... when we provide a key and a value
      //@ts-ignore
      const result = SUT.addValueWithGivenKeyToConfig('newKey')(config)('newValue')
      // then ... add a key value pair to the provided config
      expect(result).toEqual({
        aKey: 'aValue',
        anotherKey: 'anotherValue',
        newKey: 'newValue',
      })
    })
  })
  describe('addIdAsEndpointToConfig', () => {
    it('should add a given id to the endpoint key when we provide the id, given a config object', () => {
      // given ... a config object
      const config = {
        aKey: 'aValue',
        anotherKey: 'anotherValue',
      }
      // when ... we provide the id
      //@ts-ignore
      const result = SUT.addIdAsEndpointToConfig(config)(10)
      // then ... should add a given id to the endpoint key
      expect(result).toEqual({
        aKey: 'aValue',
        anotherKey: 'anotherValue',
        endpoint: 10,
      })
    })
  })
  describe('addIdBeforeEndpointInConfig', () => {
    it('should insert the given id in front of the endpoint value when we provide the id, given a config with an endpoint key', () => {
      // given ... a config with an endpoint key
      const config = {
        aKey: 'aValue',
        anotherKey: 'anotherValue',
        endpoint: 'SomeValue',
      }
      // when ... we provide the id
      //@ts-ignore
      const result = SUT.addIdBeforeEndpointInConfig(config)(10)
      // then ... should insert the given id in front of the endpoint value
      expect(result).toEqual({
        aKey: 'aValue',
        anotherKey: 'anotherValue',
        endpoint: [10, 'SomeValue'],
      })
    })
  })
  describe('addParamsToConfig', () => {
    it('should add a params key with object to the config when we provide the object of params, given a config object', () => {
      // given ... a config object
      const config = {
        aKey: 'aValue',
        anotherKey: 'anotherValue',
      }
      // when ... we provide the object of params
      //@ts-ignore
      const result = SUT.addParamsToConfig(config)({ aParam: 'Some Value' })
      // then ... should add a params key with object to the config
      expect(result).toEqual({
        aKey: 'aValue',
        anotherKey: 'anotherValue',
        params: { aParam: 'Some Value' },
      })
    })
  })
  describe('createParam', () => {
    it('should return a new config back with the key : value added when we provide a key and value', () => {
      // when ... we provide a key and value
      const result = SUT.createParam('someKey')('someValue')
      // then ... we should get an object of the key : value
      expect(result).toEqual({ someKey: 'someValue' })
    })
  })
  describe('createTypeParam', () => {
    it('should return a new config back with the value added to the type key when we provide the value', () => {
      // when ... we provide a key and value
      const result = SUT.createTypeParam('someValue')
      // then ... we should get an object of the key : value
      expect(result).toEqual({ type: 'someValue' })
    })
  })
  describe('generateSanitisedEndpoint', () => {
    it.each([
      [['client', 'endpoint'], 'client/endpoint'],
      [['client', ['endpoint']], 'client/endpoint'],
      [['client', ['endpoint', 'anotherEndpoint']], 'client/endpoint/anotherEndpoint'],
      [['client', [10, 'endpoint']], 'client/10/endpoint'],
      [['client', undefined], 'client'],
    ])(
      'should return a proper endpoint, with undefined values removed when provided an array of possible endpoint values',
      (endpoints, expected) => {
        // when ... provided an array of possible endpoint values
        const result = SUT.generateSanitisedEndpoint(endpoints)

        // then ... should return a proper endpoint, with undefined values removed
        expect(result).toBe(expected)
      },
    )
  })
  describe('setAuthTokenHeader', () => {
    it('should give the correct header string with the provided auth token when we provide a token, given a token', () => {
      // given ... a token
      const token = 'A_TOKEN'
      // when ... we provide a token
      const result = SUT.setAuthTokenHeader(token)
      // then ... should give the correct header string with the provided auth token
      expect(result).toEqual({ Authorization: `Bearer A_TOKEN` })
    })
    it('should pass through if null or undefined', () => {
      // when ... we don't provide a token
      const result = SUT.setAuthTokenHeader(undefined)
      // then ... should give the correct header string with the provided auth token
      expect(result).toEqual(undefined)
    })
  })
  describe('getTokenFromState', () => {
    // TODO: TEST ME
  })
  describe('getTokenIfRequired', () => {
    // TODO: TEST ME
  })
  describe('prepareApiRequest', () => {
    it('should return the api args, and success and failure actions when we provide it the current state and an action, given a state with auth', () => {
      // given ... a state with auth
      const state = {
        auth: {
          token: 'A_TOKEN',
        },
      }
      // when ... we provide it the current state and an action
      const action = {
        type: 'SOME_ACTION',
        payload: 'SOME PAYLOAD',
        meta: {
          requiresToken: true,
          onSuccess: 'ON SUCCESS',
          onFailure: 'ON FAILURE',
          anotherKey: 'Some Other Value',
        },
      }
      //@ts-ignore
      const result = SUT.prepareApiRequest(state, action)

      // then ... should return the api args, and success and failure actions
      expect(result).toEqual({
        apiArgs: {
          data: 'SOME PAYLOAD',
          requiresToken: true,
          token: 'A TOKEN',
          anotherKey: 'Some Other Value',
        },
        onSuccess: 'ON SUCCESS',
        onFailure: 'ON FAILURE',
      })
    })
  })
  describe('apiInstanceRequest', () => {
    // TODO: TEST ME
  })
})
