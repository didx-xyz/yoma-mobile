import { FILTERED_SKILLS_DEFAULT } from './SkillsForm.constants'

export const findSkill = (skillsList: string[], query: string) => {
  if (query) {
    const regex = new RegExp(query.trim(), 'i')
    return skillsList.filter(skill => skill.search(regex) >= 0)
  } else {
    return FILTERED_SKILLS_DEFAULT
  }
}

export const deleteSkill = (skills: string[], skill: string) => {
  return skills.filter((item: string) => item !== skill)
}
