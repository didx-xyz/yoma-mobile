import { applyAlphaToHex } from './styles.utils'

describe('styles/styles.utils', () => {
  describe('applyAlphaToHex', () => {
    it.each([
      ['#ffffff', 0.5, '#ffffff80'],
      ['#000000', 0.5, '#00000080'],
    ])('should add an alpha value to the given color hex value', (color, alpha, expected) => {
      const result = applyAlphaToHex(color)(alpha)

      expect(result).toBe(expected)
    })
  })
})
