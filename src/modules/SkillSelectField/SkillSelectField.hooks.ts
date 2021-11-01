import { useEffect, useState } from 'react'

export const filterSkills = (skills: string[], term: string): string[] =>
  skills.filter(skill => skill.toLowerCase().match(term.toLowerCase()))

export const useSkillsFilter = (skills: string[]) => {
  const [filteredSkills, setFilteredSkills] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    setFilteredSkills(skills)
  }, [skills])

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredSkills(skills)
    }
  }, [searchTerm, skills])

  useEffect(() => {
    if (searchTerm !== '') {
      const filtered = filterSkills(skills, searchTerm)
      setFilteredSkills(filtered)
    }
  }, [searchTerm, skills])

  return { filteredSkills, setSearchTerm }
}
