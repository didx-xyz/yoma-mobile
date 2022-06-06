import { ascend, filter, last, pipe, prop, sort, test, toLower, toPairs } from 'ramda'

import { CountryListItem } from './CountrySelector.types'

export const byCountryName = ascend(pipe(last, prop('name')))

export const sortCountriesAsPairs = pipe(toPairs, sort(byCountryName))

export const filterAgainstName = (term: string) => pipe(last, prop('name'), toLower, test(new RegExp(toLower(term))))

export const filterCountries = (term: string): CountryListItem[] | null => filter(filterAgainstName(term))
