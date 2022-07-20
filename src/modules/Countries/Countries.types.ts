import { Country } from 'countries-list'

export interface CountryWithCode extends Country {
  code?: string
}
export type CountryList = Record<string, CountryWithCode>

export interface NormalisedCountries {
  ids: string[]
  entities: CountryList
}

export type CountriesState = NormalisedCountries
