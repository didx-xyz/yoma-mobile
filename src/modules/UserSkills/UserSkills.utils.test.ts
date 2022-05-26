import { UserSkill, UserSkillKeys } from '~/modules/UserSkills/UserSkills.types'

import * as SUT from './UserSkills.utils'

describe('modules/UserSkills/UserSkills.utils', () => {
  describe('prepareAddSkillsForNormalisation', () => {
    it('should correctly handle an empty result', () => {
      const result = SUT.prepareAddSkillsForNormalisation([])
      expect(result).toEqual([])
    })
    it('should correctly format the skills array for normalisation', () => {
      const result = SUT.prepareAddSkillsForNormalisation(['skill1'])
      expect(result).toEqual([{ [UserSkillKeys.SkillName]: 'skill1', [UserSkillKeys.VerifiedBy]: null }])
    })
  })
  describe('getSkillCounts', () => {
    it('should handle an empty data', () => {
      const result = SUT.getSkillCounts([])
      expect(result).toEqual({})
    })
    it('should calculate the number of skills in the array', () => {
      const skillsMock = [
        { [UserSkillKeys.SkillName]: 'skill1' },
        { [UserSkillKeys.SkillName]: 'skill1' },
        { [UserSkillKeys.SkillName]: 'skill2' },
        { [UserSkillKeys.SkillName]: 'skill3' },
      ] as UserSkill[]

      const result = SUT.getSkillCounts(skillsMock)
      expect(result).toEqual({
        skill1: 2,
        skill2: 1,
        skill3: 1,
      })
    })
  })

  describe('getDedupeSkills', () => {
    it('should handle an empty data', () => {
      const result = SUT.getDedupeSkills([])
      expect(result).toEqual([])
    })
    it('should calculate the number of skills in the array', () => {
      const skillsMock = [
        { [UserSkillKeys.SkillName]: 'skill1' },
        { [UserSkillKeys.SkillName]: 'skill1' },
        { [UserSkillKeys.SkillName]: 'skill2' },
        { [UserSkillKeys.SkillName]: 'skill3' },
      ] as UserSkill[]

      const result = SUT.getDedupeSkills(skillsMock)
      expect(result).toEqual([
        { [UserSkillKeys.SkillName]: 'skill1' },
        { [UserSkillKeys.SkillName]: 'skill2' },
        { [UserSkillKeys.SkillName]: 'skill3' },
      ])
    })
  })

  describe('addSkillCountToSkillsAndDedupe', () => {
    it('should handle an empty data', () => {
      const result = SUT.addSkillCountToSkillsAndDedupe([])
      expect(result).toEqual([])
    })
    it('should calculate the number of skills in the array', () => {
      const skillsMock = [
        { [UserSkillKeys.SkillName]: 'skill1' },
        { [UserSkillKeys.SkillName]: 'skill1' },
        { [UserSkillKeys.SkillName]: 'skill2' },
        { [UserSkillKeys.SkillName]: 'skill3' },
      ] as UserSkill[]

      const result = SUT.addSkillCountToSkillsAndDedupe(skillsMock)
      expect(result).toEqual([
        { skillName: 'skill1', count: 2 },
        { skillName: 'skill2', count: 1 },
        { skillName: 'skill3', count: 1 },
      ])
    })
  })
})
