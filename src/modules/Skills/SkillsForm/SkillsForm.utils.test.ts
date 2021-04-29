import { MOCK_SKILLS_LIST } from './SkillsForm.constants'
import * as SUT from './SkillsForm.utils'

describe('SkillsForm.utils', () => {
  describe('findSkill', () => {
    it.each([
      ['', []],
      ['ux', ['UX']],
      ['des', ['Design']],
      ['f', ['Software Engineering', 'figma']],
    ])('should return a array of string match with input string', (query, expected) => {
      const result = SUT.findSkill(MOCK_SKILLS_LIST, query)

      expect(result).toEqual(expected)
    })
  })

  describe('deleteSkill', () => {
    it('should return a array after deleting the item', () => {
      const skillArray = ['SKILL1', 'SKILL2', 'SKILL3', 'SKILL4']
      const result = SUT.deleteSkill(skillArray, 'SKILL2')

      expect(result).toEqual(['SKILL1', 'SKILL3', 'SKILL4'])
    })
  })
})
