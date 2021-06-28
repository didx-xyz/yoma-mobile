import * as SUT from './ExperienceForm.utils'

describe('ExperienceForm.utils', () => {
  describe('deleteSkill', () => {
    it('should be able to delete the skill from the given array', () => {
      const skills = ['SKILL1', 'SKILL2', 'SKILL3', 'SKILL4']
      const result = SUT.deleteSkill(skills, 'SKILL3')
      expect(result).toEqual(['SKILL1', 'SKILL2', 'SKILL4'])
    })
  })
})
