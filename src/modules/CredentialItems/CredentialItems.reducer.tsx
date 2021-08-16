import { createAction, createReducer } from '@reduxjs/toolkit'

import { CredentialItemsRequest, CredentialItemsResponse, CredentialItemsState } from './CredentialItems.types'

const name = '[CredentialItems]'
export const INITIAL_STATE = {
  type: null,
  credentialItemId: '',
  startTime: '',
  endTime: '',
  requestVerification: true,
} as CredentialItemsState

export const createCredentialItem = createAction<CredentialItemsRequest>(`${name} createCredentialItem`)
export const createCredentialItemSuccess = createAction<CredentialItemsResponse>(`${name} createCredentialItemSuccess`)
export const createCredentialItemFailure = createAction<string>(`${name} createCredentialItemFailure`)

export const clearCredentialItem = createAction(`${name} clearCredentialItems`)

const CredentialItemsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(clearCredentialItem, (_state, _action) => INITIAL_STATE)
})

export default CredentialItemsReducer
