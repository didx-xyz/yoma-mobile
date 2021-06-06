export const deleteSkill = (selectedSkills: string[], tag: string) => {
  return selectedSkills.filter(result => result !== tag)
}
