import { createAction, createReducer } from '@reduxjs/toolkit'

const name = '[Organisations]'
export const INITIAL_STATE = [] as any
export const setOrganisations = createAction<any>(`${name} setOrganisations`)

export const fetchOrganisations = createAction(`${name} fetchOrganisations`)
export const fetchOrganisationsSuccess = createAction<any>(`${name} fetchOrganisationsSuccess`)
export const fetchOrganisationsFailure = createAction<string>(`${name} fetchOrganisationsFailure`)
export const clearOrganisations = createAction(`${name} clearOrganisations`)

const OrganisationsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setOrganisations, (_, action) => action.payload)
  builder.addCase(clearOrganisations, () => INITIAL_STATE)
})

export default OrganisationsReducer
