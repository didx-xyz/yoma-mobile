import { createAction, createReducer } from '@reduxjs/toolkit'

import { OrganisationResponsePayload } from './Organisations.types'

const name = '[Organisations]'
export const INITIAL_STATE = [] as Array<OrganisationResponsePayload>
export const setOrganisations = createAction<any>(`${name} setOrganisations`)

export const fetchOrganisations = createAction(`${name} fetchOrganisations`)
export const fetchOrganisationsSuccess = createAction<any>(`${name} fetchOrganisationsSuccess`)
export const fetchOrganisationsFailure = createAction<string>(`${name} fetchOrganisationsFailure`)

const OrganisationsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setOrganisations, (state, action) => state.concat(action.payload))
})

export default OrganisationsReducer
