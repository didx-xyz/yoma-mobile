import { SkillAdded, UserSkillKeys } from '~/modules/UserSkills/UserSkills.types'

export const prepareAddSkillsForNormalisation = (data: SkillAdded[]) => {
  if (data.length === 0) {
    return []
  }

  return data.map(skill => ({
    [UserSkillKeys.SkillName]: skill,
    [UserSkillKeys.VerifiedBy]: null,
  }))
}
