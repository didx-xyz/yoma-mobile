import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

import { CredentialItemsRequest, CredentialItemsResponse, CredentialItemsState } from './CredentialItems.types'

const name = '[CredentialItems]'
export const INITIAL_STATE = {
  type: null,
  credentialItemId: null,
  startTime: '',
  endTime: '',
  requestVerification: false,
} as CredentialItemsState

export const setCredentialItem = createAction<CredentialItemsRequest>(`${name} setCredentialItem`)
export const setCredentialItemId = createAction<any>(`${name} setCredentialItemId`)
export const createCredentialItem = createAction<CredentialItemsRequest>(`${name} createCredentialItem`)
export const createCredentialItemSuccess = createAction<CredentialItemsResponse>(`${name} createCredentialItemSuccess`)
export const createCredentialItemFailure = createAction<string>(`${name} createCredentialItemFailure`)

export const clearCredentialItem = createAction(`${name} clearCredentialItems`)

const CredentialItemsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setCredentialItem, (_state, action) => action.payload)
  builder.addCase(setCredentialItemId, (state, action) => mergeDeepRight(state)(action.payload))
  builder.addCase(clearCredentialItem, (_state, _action) => INITIAL_STATE)
})

export default CredentialItemsReducer
