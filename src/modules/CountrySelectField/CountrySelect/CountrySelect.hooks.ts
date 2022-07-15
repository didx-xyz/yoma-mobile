import Fuse from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'

import { filterCountries } from '~/modules/CountrySelectField/CountrySelect/CountrySelect.utils'

import { CountryListItem } from './CountrySelect.types'

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
      const fuse = new Fuse<CountryListItem>(countries, {
        keys: ['name', 'native'],
      })
      const filtered = fuse.search(searchTerm) || []
      const fil = filterCountries(searchTerm)(countries)
      console.log({ searchTerm, filtered, fil })
      const filteredCountries = filtered.map(result => result?.item)
      setResults(filteredCountries)
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
