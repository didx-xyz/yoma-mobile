import * as SUT from './boolean.utils'

describe('boolean.utils', () => {
  describe('isOdd', () => {
    it.each([
      [0, false],
      [1, true],
      [2, false],
      [3, true],
      [4, false],
      [5, true],
    ])('should correctly return whether the value is odd or not', (val, expected) => {
      const result = SUT.isOdd(val)
      expect(result).toBe(expected)
    })
  })
})
