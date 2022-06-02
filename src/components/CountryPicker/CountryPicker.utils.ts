import { ascend, last, pipe, prop, sort, toPairs } from 'ramda'

export const byCountryName = ascend(pipe(last, prop('name')))

export const sortCountriesAsPairs = pipe(toPairs, sort(byCountryName))
