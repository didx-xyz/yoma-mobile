import { createMiddlewareMock } from '../../../tests/tests.utils'
import * as SUT from './App.middleware'
import { resetAppData } from './App.reducer'

describe('modules/App/App.middleware', () => {
  describe('appResetFlow', () => {
    it('should correctly call app reset action', async () => {
      const create = createMiddlewareMock(jest)
      // given ... the resetAppData action is fired
      const action = resetAppData()
      const { next, invoke } = create(SUT.appResetFlow)

      await invoke(action)
      // ... we validate that our actions were triggered
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should handle app reset action accurately', async () => {
      const create = createMiddlewareMock(jest)

      // given ... the resetAppData action is fired
      const action = resetAppData()
      const { store, invoke } = create(SUT.appResetFlow)

      await invoke(action)
      // ... we validate that our actions were triggered
      expect(store.dispatch).toBeCalled()
    })
  })
})
