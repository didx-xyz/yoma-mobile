import SUT, { resetAppData } from './App.reducer'

describe('modules/App/App.reducer', () => {
  describe('resetAppData', () => {
    it('should clear the app state', () => {
      const action = resetAppData()
      const result = SUT({}, action)
      expect(result).toEqual({})
    })
  })
})
