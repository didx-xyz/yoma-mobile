import { has, map, mergeLeft, pipe } from 'ramda'

import { SkillAdded, UserSkill, UserSkillKeys } from '~/modules/UserSkills/UserSkills.types'

export const prepareAddSkillsForNormalisation = (data: SkillAdded[]) => {
  if (data.length === 0) {
    return []
  }

  return data.map(skill => ({
    [UserSkillKeys.SkillName]: skill,
    [UserSkillKeys.VerifiedBy]: null,
  }))
}

export const getSkillCounts = (data: UserSkill[]) => {
  const count: Record<string, number> = {}
  data.forEach((skill: UserSkill) => {
    count[skill[UserSkillKeys.SkillName]] = has(skill[UserSkillKeys.SkillName])(count)
      ? count[skill[UserSkillKeys.SkillName]] + 1
      : 1
  })

  return count
}

export const getDedupeSkills = (data: UserSkill[]) => {
  const dedupe: UserSkill[] = []
  data.forEach(skill => {
    if (!dedupe.find(dedupeSkill => dedupeSkill[UserSkillKeys.SkillName] === skill[UserSkillKeys.SkillName])) {
      dedupe.push(skill)
    }
  })

  return dedupe
}

export const addSkillCountToSkillsAndDedupe = (data: UserSkill[]) => {
  const countSkills = getSkillCounts(data)
  return pipe(
    getDedupeSkills,
    map((skill: UserSkill) => {
      return mergeLeft({ [UserSkillKeys.Count]: countSkills[skill[UserSkillKeys.SkillName]] })(skill)
    }),
  )(data)
}
