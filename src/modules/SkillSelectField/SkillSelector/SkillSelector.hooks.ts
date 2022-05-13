import { useEffect, useMemo, useState } from 'react'

import { filterSkills } from '../SkillsSelectField.utils'

export const useSkillsFilter = (skills: string[]) => {
  const [results, setResults] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    if (searchTerm.length < 2) {
      setResults([])
      setIsLoading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    if (searchTerm.length > 1 && skills.length > 0) {
      filterSkills(skills, searchTerm).then(filtered => {
        setResults(filtered)
      })
    }
  }, [searchTerm, skills])

  useEffect(() => {
    if (results.length > 0) {
      setIsLoading(false)
    }
  }, [results])

  const hasNoResults = useMemo(() => searchTerm !== '' && results.length === 0, [results.length, searchTerm])

  useEffect(() => {
    console.log({ isLoading, results, searchTerm })
  }, [isLoading, results, searchTerm])

  return {
    hasNoResults,
    isLoading,
    setIsLoading,
    results,
    searchTerm,
    setSearchTerm,
  }
}
