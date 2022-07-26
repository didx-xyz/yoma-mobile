import { useEffect, useMemo, useState } from 'react'

import { filterSkills } from './SkillSelect.utils'

export const useSkillsFilter = (skills: string[], minSearchTermLength = 3) => {
  const [results, setResults] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    if (searchTerm.length < minSearchTermLength) {
      setResults([])
    }
  }, [minSearchTermLength, searchTerm])

  useEffect(() => {
    if (searchTerm.length >= minSearchTermLength && skills.length > 0) {
      filterSkills(skills, searchTerm).then(filtered => {
        setResults(filtered)
      })
    }
  }, [minSearchTermLength, searchTerm, skills])

  const hasNoResults = useMemo(() => searchTerm !== '' && results.length === 0, [results.length, searchTerm])

  return {
    hasNoResults,
    results,
    searchTerm,
    setSearchTerm,
  }
}
