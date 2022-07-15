import React from 'react'
import { useSelector } from 'react-redux'

import CountrySelect from '~/modules/CountrySelectField'

import selector from './CountrySelect.selector'

interface Props {
  searchPlaceholder?: string
}

const CountrySelectContainer = ({ searchPlaceholder = '' }: Props) => {
  const countries = useSelector(selector)

  return <CountrySelect searchPlaceholder={searchPlaceholder} countries={countries} />
}

export default CountrySelectContainer
