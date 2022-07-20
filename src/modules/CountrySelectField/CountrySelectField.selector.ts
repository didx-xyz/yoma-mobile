import { createSelector } from '@reduxjs/toolkit'
import { Country } from 'countries-list'
import { mapObjIndexed, mergeRight, pipe, prop, values } from 'ramda'

import { selectCountries } from '~/modules/Countries/Countries.selector'
import { CountryList, NormalisedCountries } from '~/modules/Countries/Countries.types'
import { normaliseFn } from '~/redux/redux.utils'

export const selectCountriesWithCode = createSelector<any, CountryList>(
  selectCountries,
  pipe(
    prop('entities'),
    mapObjIndexed((value: Country, key: string) => mergeRight({ code: key }, value)),
    values,
  ),
)

export default createSelector<any, NormalisedCountries>(selectCountriesWithCode, pipe(normaliseFn('code')))
