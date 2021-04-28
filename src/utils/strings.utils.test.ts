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
})
