import { ascend, filter, last, pipe, prop, sort, test as testRegex, toLower, toPairs } from 'ramda'

import { FilterCountries } from './CountrySelect.types'

export const byCountryName = ascend(pipe(last, prop('name')))

export const sortCountriesAsPairs = pipe(toPairs, sort(byCountryName))

export const filterAgainstName = (term: string) =>
  pipe(last, prop('name'), toLower, testRegex(new RegExp(toLower(term))))

export const filterCountries: FilterCountries = (term: string) => filter(filterAgainstName(term))
