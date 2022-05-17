import { UserSkillKeys } from '~/modules/UserSkills/UserSkills.types'

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
})
