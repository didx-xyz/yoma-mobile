import * as SUT from './AlphabeticListNavigator.hooks'

describe('components/AlphabeticListNavigator/AlphabeticListNavigator.hooks', () => {
  describe('useLetterNavigation', () => {
    it('should ', () => {
      const result = SUT.useLetterNavigation(300, ['a', 'b', 'c'])
      expect(result).toEqual(null)
    })
  })
})
