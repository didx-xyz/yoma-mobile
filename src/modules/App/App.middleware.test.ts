import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as AuthActions } from '../Auth'
import { actions as UserActions } from '../User'
import * as SUT from './App.middleware'
import { hydrateApp, resetAppData } from './App.reducer'

describe('modules/App/App.middleware', () => {
  describe('appResetFlow', () => {
    it('should correctly handle an app reset action', () => {
      const create = createMiddlewareStub(jest)
      // given ... the resetAppData action is fired
      const action = resetAppData()
      const { store, next, invoke } = create(SUT.appResetFlow)

      invoke(action)
      // ... we validate that our actions were triggered
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should handle app reset action accurately', () => {
      const create = createMiddlewareStub(jest)

      // given ... the resetAppData action is fired
      const action = resetAppData()
      const { store, invoke } = create(SUT.appResetFlow)

      invoke(action)
      // ... we validate that our actions were triggered
      expect(store.dispatch).toHaveBeenCalledWith(AuthActions.clearAuth())
    })
  })
  describe('hydrateAppFlow', () => {
    it('should correctly handle being called', () => {
      const create = createMiddlewareStub(jest)
      // given ...

      // when ... we want to populate the required app data
      const action = hydrateApp()
      const { store, next, invoke } = create(SUT.hydrateAppFlow)

      invoke(action)

      // then ...
      // ... the action should be passed through
      expect(next).toHaveBeenCalledWith(action)

      // ... we should ensure that we populating the app data
      // ... by expecting that an action will be dispatched
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should fetch all required data', () => {
      // given ...

      // when ... we want to populate the required app data
      const create = createMiddlewareStub(jest)
      const action = hydrateApp()
      const { store, invoke } = create(SUT.hydrateAppFlow)

      invoke(action)

      // then ... we should fetch data from all expected endpoints
      expect(store.dispatch).toHaveBeenCalledWith(UserActions.fetchUserCredentials())
    })
  })
})
