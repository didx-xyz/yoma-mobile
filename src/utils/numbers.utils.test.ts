import * as SUT from './numbers.utils'

describe('utils/numbers.utils', () => {
  describe('toFixed', () => {
    it.each([
      [12345.6789, undefined, '12346'],
      [12345.6789, 1, '12345.7'],
      [12345.6789, 6, '12345.678900'],
      [2.34, 1, '2.3'],
      [2.35, 1, '2.4'],
      [2.55, 1, '2.5'],
    ])('should behave exactly as javascript`s toFixed method, but be point free', (value, digits, expected) => {
      const result = SUT.toFixed(digits)(value)

      expect(result).toBe(expected)
    })
  })

  describe('toStringWithRadix', () => {
    it.each([
      [100, undefined, '100'],
      [127, 16, '7f'],
      [17, undefined, '17'],
      [6, 2, '110'],
      [254, 16, 'fe'],
      [-10, 2, '-1010'],
      [-0xff, 2, '-11111111'],
    ])(
      'should behave exactly as javascript`s Number.prototype.toString() method, but be point free',
      (value, radix, expected) => {
        const result = SUT.toStringWithRadix(radix)(value)

        expect(result).toBe(expected)
      },
    )
    it.each([
      ['128', 16, '80'],
      ['128', undefined, '128'],
    ])('should be able to handle a string value and return correct value once a number', (value, radix, expected) => {
      const result = SUT.toStringWithRadix(radix)(value)

      expect(result).toBe(expected)
    })
  })
})
