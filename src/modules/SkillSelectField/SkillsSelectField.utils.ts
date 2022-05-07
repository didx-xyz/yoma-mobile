export const filterSkills = async (skills: string[], term: string): Promise<string[]> =>
  skills.filter(skill => skill.toLowerCase().match(term.toLowerCase()))
