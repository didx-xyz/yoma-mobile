import { createMiddlewareStub } from '../../../tests/tests.utils'
import * as ApiActions from '../../api/api.reducer'
import * as SUT from './Error.middleware'
import { unauthorizedError } from './Error.reducer'

describe('modules/Error/Error.middleware', () => {
  describe('categorizeErrorsFlow', () => {
    it('should correctly handle being called', async () => {
      // given ...
      const create = createMiddlewareStub(jest)

      const action = ApiActions.apiError({
        message: 'ERROR MESSAGE',
        meta: {
          success: false,
          code: 401,
          message: 'A DETAILED ERROR MESSAGE',
        },
      })

      // when ... we respond to the login action
      // @ts-ignore
      const { invoke, next, store } = create(SUT.categorizeErrorsFlow)
      await invoke(action)

      // then ... the login API should be called
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should catch unauthorized errors', async () => {
      // given ...
      const create = createMiddlewareStub(jest)

      const action = ApiActions.apiError({
        message: 'ERROR MESSAGE',
        meta: {
          success: false,
          code: 401,
          message: 'A DETAILED ERROR MESSAGE',
        },
      })

      // when ... we respond to the login action
      // @ts-ignore
      const { invoke, store } = create(SUT.categorizeErrorsFlow)
      await invoke(action)

      // then ... the login API should be called
      expect(store.dispatch).toHaveBeenCalledWith(unauthorizedError())
    })
    it('should ignore any error that is not unauthorized', async () => {
      // given ...
      const create = createMiddlewareStub(jest)

      const action = ApiActions.apiError({
        message: 'ERROR MESSAGE',
        meta: {
          success: false,
          code: 500,
          message: 'A DETAILED ERROR MESSAGE',
        },
      })

      // when ... we respond to the login action
      // @ts-ignore
      const { invoke, store } = create(SUT.categorizeErrorsFlow)
      await invoke(action)

      // then ... the login API should be called
      expect(store.dispatch).not.toHaveBeenCalled()
    })
  })
})
