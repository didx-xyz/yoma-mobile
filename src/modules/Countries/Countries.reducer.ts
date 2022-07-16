import { createAction, createReducer } from '@reduxjs/toolkit'

import { actionName } from '~/redux/redux.utils'

import { CountriesState, CountryList, NormalisedCountries } from './Countries.types'

const name = '[Countries]'
const countryAction = actionName(name)

export const INITIAL_STATE = {
  ids: [],
  entities: {},
} as CountriesState

export const getCountries = createAction(countryAction('getCountries'))
export const getCountriesSuccess = createAction<CountryList>(countryAction('getCountriesSuccess'))
export const normaliseCountriesSuccess = createAction<NormalisedCountries>(countryAction('normaliseCountriesSuccess'))
export const setCountries = createAction<NormalisedCountries>(countryAction('setCountries'))
export const clearCountries = createAction(countryAction('clearCountries'))

const CountriesReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setCountries, (_state, action) => action.payload)
  builder.addCase(clearCountries, (_state, _action) => INITIAL_STATE)
})

export default CountriesReducer
