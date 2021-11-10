import * as SUT from './arrays.utils'

describe('arrays.utils', () => {
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
  describe('dropElement', () => {
    it.each([
      ['skill1', ['skill1', 'skill2', 'skill3'], ['skill2', 'skill3']],
      ['test', ['skill1', 'skill2', 'skill3'], ['skill1', 'skill2', 'skill3']],
      ['', ['skill1', 'skill2', 'skill3'], ['skill1', 'skill2', 'skill3']],
    ])('should drop an element from array', (value, array, expected) => {
      const result = SUT.dropElement(value)(array)
      expect(result).toEqual(expected)
    })
  })
})
