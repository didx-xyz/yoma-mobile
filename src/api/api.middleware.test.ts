import { createMiddlewareStub } from '../../tests/tests.utils'
import * as SUT from './api.middleware'
import { apiError, apiRequest } from './api.reducer'

describe('api/api.middleware.ts', () => {
  describe('apiFlow', () => {
    it('should should correctly handle being called', async () => {
      // given ... a request
      const create = createMiddlewareStub(jest)
      const apiClientStub = jest.fn().mockResolvedValue('SUCCESSFUL RESPONSE')
      const prepArgsStub = jest.fn().mockReturnValue({ apiArgs: 'ARGS', onSuccess: jest.fn, onFailure: jest.fn })
      //@ts-ignore
      const action = apiRequest('DATA')

      // when ... we want to call the api
      const { invoke, next } = create(SUT.apiFlow({ api: apiClientStub, prepArgs: prepArgsStub }))
      await invoke(action)

      // then...
      expect.hasAssertions()

      // ... we should attempt to authorise the user
      expect(prepArgsStub).toHaveBeenCalled()
      expect(apiClientStub).toHaveBeenCalled()

      // ... we should correctly pass the action to next
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle a successful api call', async () => {
      // given ... a request
      const create = createMiddlewareStub(jest)
      const apiClientStub = jest
        .fn()
        .mockResolvedValue({ config: 'CONFIG', request: 'REQUEST', data: 'SUCCESSFUL RESPONSE' })
      const onSuccessStub = jest.fn(x => ({ type: 'onSuccess', payload: x }))
      const onFailureStub = jest.fn(x => ({ type: 'onFailure', payload: x }))
      const prepArgsStub = jest
        .fn()
        .mockReturnValue({ apiArgs: 'ARGS', onSuccess: onSuccessStub, onFailure: onFailureStub })
      //@ts-ignore
      const action = apiRequest('DATA')

      // when ... we want to call the api
      const { invoke, store } = create(SUT.apiFlow({ api: apiClientStub, prepArgs: prepArgsStub }))
      await invoke(action)

      // then...
      expect.hasAssertions()

      // ... should correctly send provided data
      expect(store.dispatch).toHaveBeenCalledWith(onSuccessStub({ data: 'SUCCESSFUL RESPONSE' }))
    })
    it('should correctly handle when the api fails', async () => {
      // given ... a request
      const create = createMiddlewareStub(jest)
      const apiClientStub = jest.fn().mockRejectedValue({ response: { message: 'ERROR' } })
      const onSuccessStub = jest.fn(x => ({ type: 'onSuccess', payload: x }))
      const onFailureStub = jest.fn(x => ({ type: 'onFailure', payload: x }))
      const prepArgsStub = jest
        .fn()
        .mockReturnValue({ apiArgs: 'ARGS', onSuccess: onSuccessStub, onFailure: onFailureStub })
      //@ts-ignore
      const action = apiRequest('DATA')

      // when ... we want to call the api
      const { invoke, store } = create(SUT.apiFlow({ api: apiClientStub, prepArgs: prepArgsStub }))
      await invoke(action)

      // then...
      expect.hasAssertions()

      // ... should correctly send provided data
      expect(store.dispatch).toHaveBeenCalledWith(apiError({ onFailure: onFailureStub }, { message: 'ERROR' }))
    })
  })
})
