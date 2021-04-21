import * as SUT from './strings.utils'

describe('strings.utils', () => {
  describe('getFirstCharacter', () => {
    it.each([
      ['john', 'J'],
      ['Carol', 'C'],
      ['', ''],
      [' arol', 'A'],
    ])('should be able to return the first character of the value in UpperCase', (value, expected) => {
      const result = SUT.getFirstCharacter(value)
      expect(result).toBe(expected)
    })
  })
})
