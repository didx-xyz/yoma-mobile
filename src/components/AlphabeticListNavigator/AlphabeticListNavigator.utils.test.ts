import * as SUT from './AlphabeticListNavigator.utils'

describe('components/AlphabeticListNavigator.utils', () => {
  describe('shouldAdjustHeight', () => {
    it.each([
      [300, true],
      [600, false],
    ])('should check if the height of the view is smaller than the alphabet list', (viewHeight, expected) => {
      const lettersMock = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
      const result = SUT.shouldAdjustHeight(viewHeight, 50)(lettersMock)
      expect(result).toBe(expected)
    })
  })
  describe('navLetters', () => {
    it('should return a list of single de-duped characters with associated letter count', () => {
      const data = ['add', 'art', 'bat', 'card', 'cat', 'client', 'elope', 'end', 'grail']
      const result = SUT.navLetters(false)(data)
      expect(result).toEqual([
        { name: 'a', index: 0 },
        { name: 'b', index: 2 },
        { name: 'c', index: 3 },
        { name: 'e', index: 6 },
        { name: 'g', index: 8 },
      ])
    })
    it('should inject bullets if condition is true', () => {
      const data = ['add', 'art', 'bat', 'card', 'cat', 'client', 'elope', 'end', 'grail']
      const result = SUT.navLetters(true)(data)
      expect(result).toEqual([
        { name: 'a', index: 0 },
        { name: '•', index: 2, isSpacer: true },
        { name: 'c', index: 3 },
        { name: '•', index: 6, isSpacer: true },
        { name: 'g', index: 8 },
      ])
    })
  })
})
