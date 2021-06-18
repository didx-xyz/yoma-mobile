import * as SUT from './App.reducer'

describe('modules/App/App.reducer', () => {
  describe('resetAppData', () => {
    it('should clear the app state', () => {
      const action = SUT.resetAppData()
      expect(action).toBeTruthy()
    })
  })
})
