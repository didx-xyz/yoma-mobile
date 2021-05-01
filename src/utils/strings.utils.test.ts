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
})
