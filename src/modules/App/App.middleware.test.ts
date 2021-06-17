import { createMiddlewareMock } from '../../../tests/tests.utils'
import * as SUT from './App.middleware'
import { resetAppData } from './App.reducer'
import { AppResetActions } from './App.types'

describe('modules/App/App.middleware', () => {
  describe('appResetFlow', () => {
    it('should correctly call reset actions ', async () => {
      const mockResetActions: AppResetActions = [{ payload: { data: 'DATA' }, type: 'RESET A' }]

      const create = createMiddlewareMock(jest)
      // given ... the resetAppData action is fired
      const action = resetAppData()
      const { store, invoke } = create(SUT.appResetFlow(mockResetActions))

      await invoke(action)
      // ... we validate that our actions were triggered
      mockResetActions.forEach(resetAction => expect(store.dispatch).toHaveBeenCalledWith(resetAction))
    })
    it('should handle reset actions accurately', async () => {
      const mockResetActions: AppResetActions = [{ payload: { data: 'DATA' }, type: 'RESET A' }]

      const create = createMiddlewareMock(jest)
      // given ... the resetAppData action is fired
      const action = resetAppData()
      const { store, invoke } = create(SUT.appResetFlow(mockResetActions))

      await invoke(action)
      // ... we validate that our actions were triggered x times
      expect(store.dispatch).toBeCalledTimes(1)
    })
    it('should not handle any actions', async () => {
      const mockResetActions: AppResetActions = []

      const create = createMiddlewareMock(jest)
      // given ... the resetAppData action is fired
      const action = resetAppData()
      const { store, invoke } = create(SUT.appResetFlow(mockResetActions))

      await invoke(action)
      // ... we validate that our actions were triggered x times
      expect(store.dispatch).toBeCalledTimes(0)
    })
  })
})
