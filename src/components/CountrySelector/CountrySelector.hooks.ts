import { useEffect, useMemo, useState } from 'react'

import { CountryListItem } from './CountrySelector.types'
import { filterCountries } from './CountrySelector.utils'

export const useCountriesFilter = (countries: CountryListItem[]) => {
  const [results, setResults] = useState<CountryListItem[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    if (searchTerm.length < 2) {
      setResults(countries)
    }
  }, [countries, searchTerm])

  useEffect(() => {
    if (searchTerm.length > 1 && countries.length > 0) {
      const filtered = filterCountries(countries, searchTerm) || []
      setResults(filtered)
    }
  }, [searchTerm, countries])

  const hasNoResults = useMemo(() => searchTerm !== '' && results.length === 0, [results.length, searchTerm])

  return {
    hasNoResults,
    results,
    searchTerm,
    setSearchTerm,
  }
}
