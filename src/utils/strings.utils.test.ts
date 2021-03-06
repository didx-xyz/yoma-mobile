import * as SUT from './strings.utils'

describe('strings.utils', () => {
  describe('getUppercasedHead', () => {
    it.each([
      ['john', 'J'],
      ['Carol', 'C'],
      ['', ''],
      [' arol', 'A'],
    ])('should be able to return the first character of the value in UpperCase', (value, expected) => {
      const result = SUT.getUppercasedHead(value)
      expect(result).toBe(expected)
    })
  })
  describe('capitalize', () => {
    it.each([
      ['john', 'John'],
      ['facebook', 'Facebook'],
      ['', ''],
      [
        'truth in advertising and dinosaurs with skateboards have much in common.',
        'Truth in advertising and dinosaurs with skateboards have much in common.',
      ],
    ])('should return a given string with the first character uppercased', (value, expected) => {
      const result = SUT.capitalize(value)
      expect(result).toBe(expected)
    })
  })
  describe('textOrSpace', () => {
    it.each([
      [true, 'test', 'test'],
      [false, '', ' '],
    ])('should return a text if not empty or return space', (condition, data, expected) => {
      const result = SUT.textOrSpace(condition, data)
      expect(result).toEqual(expected)
    })
  })
  describe('trunc', () => {
    it('should truncate the given text at the given length', () => {
      const result = SUT.trunc('truth in advertising and dinosaurs with skateboards have much in common.', 21)
      expect(result).toBe('truth in advertising...')
      expect(result.length).toBe(23)
    })
    it('should return the given string if the text is less than the given length', () => {
      const result = SUT.trunc('truth in advertising.', 100)
      expect(result).toBe('truth in advertising.')
      expect(result.length).toBe(21)
    })
  })
})
