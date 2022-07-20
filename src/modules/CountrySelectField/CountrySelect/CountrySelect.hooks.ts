import Fuse from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'

export const useCountriesFilter = (countryIds: string[]) => {
  const [results, setResults] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const minSearchTermLength = 3

  useEffect(() => {
    console.log({ searchTerm })
    if (searchTerm.length < minSearchTermLength) {
      setResults(countryIds)
    }
  }, [countryIds, searchTerm])

  useEffect(() => {
    if (searchTerm.length >= minSearchTermLength && !!countryIds) {
      const fuseOptions = {
        shouldSort: true,
        threshold: 0.6,
        location: 10,
        includeScore: true,
        minMatchCharLength: minSearchTermLength,
      }
      const fuse = new Fuse<string>(countryIds, fuseOptions)
      const filtered = fuse.search(searchTerm)
      const filteredCountries = filtered.map(result => result?.item)
      setResults(filteredCountries)
    }
  }, [searchTerm, countryIds])

  const hasNoResults = useMemo(() => searchTerm !== '' && results.length === 0, [results.length, searchTerm])

  return {
    hasNoResults,
    results,
    searchTerm,
    setSearchTerm,
  }
}
