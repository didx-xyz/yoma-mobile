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
  describe('withoutElseAppend', () => {
    it('should add a skill to the list if it is not already in the list', () => {
      const skillsMock = ['skill 1', 'skill 2', 'skill 3']
      const result = SUT.withoutElseAppend('skill 4')(skillsMock)

      expect(result).toEqual(['skill 1', 'skill 2', 'skill 3', 'skill 4'])
    })
    it('should remove a skill from the list if it is already in the list', () => {
      const skillsMock = ['skill 1', 'skill 2', 'skill 3', 'skill 4']
      const result = SUT.withoutElseAppend('skill 4')(skillsMock)

      expect(result).toEqual(['skill 1', 'skill 2', 'skill 3'])
    })
  })
})
