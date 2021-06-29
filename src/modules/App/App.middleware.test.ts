import { createMiddlewareMock } from '../../../tests/tests.utils'
import { actions as AuthActions } from '../Auth'
import * as SUT from './App.middleware'
import { resetAppData } from './App.reducer'

describe('modules/App/App.middleware', () => {
  describe('appResetFlow', () => {
    it('should correctly handle an app reset action', () => {
      const create = createMiddlewareMock(jest)
      // given ... the resetAppData action is fired
      const action = resetAppData()
      const { store, next, invoke } = create(SUT.appResetFlow)

      invoke(action)
      // ... we validate that our actions were triggered
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should handle app reset action accurately', () => {
      const create = createMiddlewareMock(jest)

      // given ... the resetAppData action is fired
      const action = resetAppData()
      const { store, invoke } = create(SUT.appResetFlow)

      invoke(action)
      // ... we validate that our actions were triggered
      expect(store.dispatch).toHaveBeenCalledWith(AuthActions.clearAuth())
    })
  })
})
