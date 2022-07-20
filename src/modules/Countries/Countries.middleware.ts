import { Middleware } from 'redux'

import {
  getCountries,
  getCountriesSuccess,
  normaliseCountriesSuccess,
  setCountries,
} from '~/modules/Countries/Countries.reducer'
import { CountryList } from '~/modules/Countries/Countries.types'

export const getCountriesFlow =
  ({ countryList }: { countryList: CountryList }): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getCountries.match(action)) {
      dispatch(getCountriesSuccess(countryList))
    }
    return result
  }

export const normaliseCountriesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getCountriesSuccess.match(action)) {
      const normalisedCountries = {
        ids: Object.keys(action.payload),
        entities: action.payload,
      }
      dispatch(normaliseCountriesSuccess(normalisedCountries))
    }
    return result
  }

export const setCountriesFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normaliseCountriesSuccess.match(action)) {
      dispatch(setCountries(action.payload))
    }
    return result
  }
