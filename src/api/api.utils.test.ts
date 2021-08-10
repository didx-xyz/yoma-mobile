import * as SUT from './api.utils'

describe('api/api.utils', () => {
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
      const result = SUT.prependIdToEndpointInConfig(config)(10)
      // then ... should insert the given id in front of the endpoint value
      expect(result).toEqual({
        aKey: 'aValue',
        anotherKey: 'anotherValue',
        endpoint: [10, 'SomeValue'],
      })
    })
  })
  describe('appendIdToEndpointInConfig', () => {
    it('should insert the given id in end of the config endpoint array', () => {
      // given ... a config with an endpoint key
      const config = {
        aKey: 'aValue',
        anotherKey: 'anotherValue',
        endpoint: [5, 'SomeValue'],
      }
      // when ... we provide the id
      //@ts-ignore
      const result = SUT.appendIdToEndpointInConfig(config)(10)
      // then ... should insert the given id in end of the endpoint array
      expect(result).toEqual({
        aKey: 'aValue',
        anotherKey: 'anotherValue',
        endpoint: [5, 'SomeValue', 10],
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
  describe('addHeaders', () => {
    it('should merge all given header objects into a single object when passed an array of objects, given an initial header object', () => {
      // given ... an initial header object
      const mockInitialHeaders = { initialHeader: 'INITIAL HEADER' }
      const mockHeaders = [{ someHeader: 'SOME HEADER' }, { anotherHeader: 'ANOTHER HEADER' }, undefined]

      // when ... passed an array of objects
      const result = SUT.addHeaders(mockInitialHeaders)(mockHeaders)

      // then ... should merge all given header objects into a single object
      expect(result).toEqual({
        initialHeader: 'INITIAL HEADER',
        someHeader: 'SOME HEADER',
        anotherHeader: 'ANOTHER HEADER',
      })
    })
  })
  describe('setAuthTokenHeader', () => {
    it('should give the correct header string with the provided auth token when we provide a token, given a token', () => {
      // given ... a token
      const token = 'A_TOKEN'
      // when ... we provide a token
      const result = SUT.setAuthTokenHeader(token)
      // then ... should give the correct header string with the provided auth token
      expect(result).toEqual({ Authorization: 'Bearer A_TOKEN' })
    })
    it('should pass through if null or undefined', () => {
      // when ... we don't provide a token
      const result = SUT.setAuthTokenHeader(undefined)
      // then ... should give the correct header string with the provided auth token
      expect(result).toEqual(undefined)
    })
  })
  describe('getTokenFromState', () => {
    it('should get the auth token when we request the token, given state with a token in it', () => {
      // given ... state with a token in it
      const mockedState = {
        auth: {
          token: 'AUTH TOKEN',
          anotherKey: 'ANOTHER VALUE',
        },
      }
      // when ... we request the token
      const result = SUT.getTokenFromState(mockedState)

      // then ... should get the auth token
      expect(result).toBe('AUTH TOKEN')
    })
    it('should return null when we request the token, given state has no token in it', () => {
      // given ... state with a token in it
      const mockedState = {
        anotherKey: 'ANOTHER VALUE',
      }
      // when ... we request the token
      const result = SUT.getTokenFromState(mockedState)

      // then ... should get the auth token
      expect(result).toBe(null)
    })
  })
  describe('getTokenIfRequired', () => {
    it('should return the token when the condition is met, given there is a token in state', () => {
      // given ... there is a token in state
      const mockedState = {
        auth: {
          token: 'AUTH TOKEN',
          anotherKey: 'ANOTHER VALUE',
        },
      }
      // when ... the condition is met
      //@ts-ignore - state is mocked for test
      const result = SUT.getTokenIfRequired(mockedState)(true)

      // then ... should return the token
      expect(result).toBe('AUTH TOKEN')
    })
    it('should return null when the token is required, given the token is not in state', () => {
      // given ... the token is not in state
      const mockedState = {
        anotherKey: 'ANOTHER VALUE',
      }
      // when ... the token is required
      //@ts-ignore - state is mocked for test
      const result = SUT.getTokenIfRequired(mockedState)(true)

      // then ... should return null
      expect(result).toBe(null)
    })
    it('should return undefined when the token is not required, given a state object', () => {
      // given ... a state object
      const mockedState = {
        auth: {
          token: 'AUTH TOKEN',
          anotherKey: 'ANOTHER VALUE',
        },
      }
      // when ... the token is not required
      //@ts-ignore - state is mocked for test
      const result = SUT.getTokenIfRequired(mockedState)(false)

      // then ... should return undefined
      expect(result).toBe(undefined)
    })
  })
  describe('prepareApiRequest', () => {
    it('should return the api args, and success and failure actions when we provide it the current state and an action, given a state with auth', () => {
      // given ... a state with auth
      const state = {
        auth: {
          token: 'A TOKEN',
        },
      }
      // when ... we provide it the current state and an action
      const action = {
        type: 'SOME_ACTION',
        payload: 'SOME PAYLOAD',
        meta: {
          isTokenRequired: true,
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
          token: 'A TOKEN',
          anotherKey: 'Some Other Value',
        },
        onSuccess: 'ON SUCCESS',
        onFailure: 'ON FAILURE',
      })
    })
  })
  describe('apiCall', () => {
    it('should correctly setup the axios instance when we make an api call, given a state and an instance', () => {
      // given ... a state and an instance
      const instanceStub = { request: jest.fn() }
      const args = {
        client: 'CLIENT',
        endpoint: 'ENDPOINT',
        method: 'METHOD',
        token: 'TOKEN',
        data: 'DATA',
        params: { someKey: 'SOME VALUE' },
      }

      // when ... we make an api call
      //@ts-ignore
      SUT.apiCall(instanceStub)(args)

      // then ... should correctly setup the axios instance
      expect(instanceStub.request).toBeCalledWith({
        url: 'CLIENT/ENDPOINT',
        method: 'METHOD',
        headers: { Authorization: 'Bearer TOKEN' },
        data: 'DATA',
        params: { someKey: 'SOME VALUE' },
      })
    })
  })
})
