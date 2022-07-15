import { Country } from 'countries-list'

export type CountryListItem = [string, Country]
export type FilterCountries = (term: string) => (data: any[]) => CountryListItem[] | null
