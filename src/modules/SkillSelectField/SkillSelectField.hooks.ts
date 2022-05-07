import { useEffect, useState } from 'react'

import { filterSkills } from './SkillsSelectField.utils'

export const useSkillsFilter = (skills: string[]) => {
  const [results, setResults] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    if (searchTerm === '') {
      setResults([])
    }
  }, [searchTerm])

  useEffect(() => {
    if (searchTerm !== '' && skills.length > 0) {
      filterSkills(skills, searchTerm).then(filtered => {
        setResults(filtered)
      })
    }
  }, [searchTerm, skills])

  useEffect(() => {
    setIsLoading(false)
  }, [results])

  return { isLoading, setIsLoading, results, searchTerm, setSearchTerm }
}
