import * as SUT from './ExperienceForm.utils'

// !FIX Error Jest encountered an unexpected token if not adding below function
jest.mock('rn-fetch-blob', () => {})

describe('ExperienceForm.utils', () => {
  describe('deleteSkill', () => {
    it('should be able to delete the skill from the given array', () => {
      const skills = ['SKILL1', 'SKILL2', 'SKILL3', 'SKILL4']
      const result = SUT.deleteSkill(skills, 'SKILL3')
      expect(result).toEqual(['SKILL1', 'SKILL2', 'SKILL4'])
    })
  })
})
