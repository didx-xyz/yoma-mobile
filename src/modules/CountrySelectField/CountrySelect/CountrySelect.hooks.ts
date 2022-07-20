import Fuse from 'fuse.js'
import { map, prop } from 'ramda'
import { useEffect, useMemo, useState } from 'react'

export const useCountriesFilter = (countryIds: string[], minSearchTermLength = 3) => {
  const [results, setResults] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    if (searchTerm.length < minSearchTermLength) {
      setResults(countryIds)
    }
  }, [countryIds, minSearchTermLength, searchTerm])

  useEffect(() => {
    if (searchTerm.length >= minSearchTermLength && !!countryIds) {
      const fuseOptions = {
        shouldSort: true,
        threshold: 0.6,
        location: 10,
        minMatchCharLength: minSearchTermLength,
      }
      const fuse = new Fuse<string>(countryIds, fuseOptions)
      const filtered = fuse.search(searchTerm)
      const filteredCountries = map(prop('item'))(filtered)

      setResults(filteredCountries)
    }
  }, [searchTerm, countryIds, minSearchTermLength])

  const hasNoResults = useMemo(() => searchTerm !== '' && results.length === 0, [results.length, searchTerm])

  return {
    hasNoResults,
    results,
    searchTerm,
    setSearchTerm,
  }
}
