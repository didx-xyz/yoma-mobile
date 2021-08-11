import { createAction, createReducer } from '@reduxjs/toolkit'

import { OrganisationsResponsePayload } from './Organisations.types'

const name = '[Organisations]'
export const INITIAL_STATE = [] as OrganisationsResponsePayload
export const setOrganisations = createAction<OrganisationsResponsePayload>(`${name} setOrganisations`)

export const fetchOrganisations = createAction(`${name} fetchOrganisations`)
export const fetchOrganisationsSuccess = createAction<any>(`${name} fetchOrganisationsSuccess`)
export const fetchOrganisationsFailure = createAction<string>(`${name} fetchOrganisationsFailure`)
export const clearOrganisations = createAction(`${name} clearOrganisations`)

const organisationsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setOrganisations, (_, action) => action.payload)
  builder.addCase(clearOrganisations, (_state, _action) => INITIAL_STATE)
})

export default organisationsReducer
