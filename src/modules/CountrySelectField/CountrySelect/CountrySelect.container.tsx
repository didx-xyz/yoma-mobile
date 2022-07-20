import React from 'react'
import { useSelector } from 'react-redux'

import CountrySelect from './CountrySelect'
import selector from './CountrySelect.selector'

interface Props {
  searchPlaceholder?: string
  onItemSelect: (code?: string) => void
}

const CountrySelectContainer = ({ onItemSelect, searchPlaceholder = '' }: Props) => {
  const countriesByName = useSelector(selector)

  return (
    <CountrySelect
      searchPlaceholder={searchPlaceholder}
      countriesByName={countriesByName}
      onItemSelect={onItemSelect}
    />
  )
}

export default CountrySelectContainer
