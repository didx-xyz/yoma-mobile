import * as SUT from './strings.utils'

describe('strings.utils', () => {
  describe('mapToDropDownArray', () => {
    it('should return array of objects with keys label and value', () => {
      const array = [
        {
          skill: 'SKILL1',
          id: 'ID1',
        },
        {
          skill: 'SKILL2',
          id: 'ID2',
        },
        {
          skill: 'SKILL3',
          id: 'ID3',
        },
      ]

      const result = SUT.mapToDropDownArray(array, 'id', 'skill')

      expect(result).toMatchObject([
        { label: 'SKILL1', value: 'ID1' },
        { label: 'SKILL2', value: 'ID2' },
        { label: 'SKILL3', value: 'ID3' },
      ])
    })
  })
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
  describe('filterStringArray', () => {
    it.each([
      ['skill1', ['skill1', 'skill2', 'skill3'], ['skill2', 'skill3']],
      ['test', ['skill1', 'skill2', 'skill3'], ['skill1', 'skill2', 'skill3']],
      ['', ['skill1', 'skill2', 'skill3'], ['skill1', 'skill2', 'skill3']],
    ])('should return a filtered string array', (value, array, expected) => {
      const result = SUT.filterStringArray(value, array)
      expect(result).toEqual(expected)
    })
  })
})
