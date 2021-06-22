import * as SUT from './App.actions'
import { AppActions } from './types'

describe('modules/App/App.actions', () => {
  describe('resetAppData', () => {
    it('should return correct action type', async () => {
      const state = { type: AppActions.resetApp }
      const actions = SUT.resetAppData()
      expect(actions).toEqual(state)
    })
  })
})
