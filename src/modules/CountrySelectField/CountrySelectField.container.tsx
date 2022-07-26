import React from 'react'
import { useSelector } from 'react-redux'

import CountrySelectField from './CountrySelectField'
import selector from './CountrySelectField.selector'

interface Props {
  name: string
  label?: string
  modalHeader?: string
  searchPlaceholder?: string
}

const CountrySelectFieldContainer = ({ name, label, modalHeader, searchPlaceholder = '' }: Props) => {
  const countriesByCode = useSelector(selector)

  return (
    <CountrySelectField
      searchPlaceholder={searchPlaceholder}
      countriesByCode={countriesByCode}
      name={name}
      label={label}
      modalHeader={modalHeader}
    />
  )
}

export default CountrySelectFieldContainer
