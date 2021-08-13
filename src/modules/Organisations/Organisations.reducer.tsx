import { createAction, createReducer } from '@reduxjs/toolkit'

import { NormalisedOrganisations, Organisation, OrganisationsResponse, OrganisationsState } from './Organisations.types'

const name = '[Organisations]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
} as OrganisationsState

export const setOrganisations = createAction<NormalisedOrganisations>(`${name} setOrganisations`)
export const getOrganisationsSuccess = createAction<Organisation[]>(`${name} getOrganisationsSuccess`)
export const normaliseOrganisationsSuccess = createAction<NormalisedOrganisations>(
  `${name} normaliseOrganisationsSuccess`,
)
export const fetchOrganisations = createAction(`${name} fetchOrganisations`)
export const fetchOrganisationsSuccess = createAction<OrganisationsResponse>(`${name} fetchOrganisationsSuccess`)
export const fetchOrganisationsFailure = createAction<string>(`${name} fetchOrganisationsFailure`)
export const clearOrganisations = createAction(`${name} clearOrganisations`)

const OrganisationsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setOrganisations, (_state, action) => action.payload)
  builder.addCase(clearOrganisations, (_state, _action) => INITIAL_STATE)
})

export default OrganisationsReducer
