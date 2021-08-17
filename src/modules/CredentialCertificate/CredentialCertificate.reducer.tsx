import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

import {
  CredentialCertificateRequest,
  CredentialCertificateResponse,
  CredentialCertificateState,
} from './CredentialCertificate.types'

const name = '[CredentialCertificate]'
export const INITIAL_STATE = {
  type: null,
  credentialItemId: null,
  startTime: '',
  endTime: '',
  requestVerification: false,
} as CredentialCertificateState

export const setCredentialCertificate = createAction<CredentialCertificateRequest>(`${name} setCredentialCertificate`)
export const setCredentialItemId = createAction<any>(`${name} setCredentialItemId`)
export const createCredentialCertificate = createAction<CredentialCertificateRequest>(
  `${name} createCredentialCertificate`,
)
export const createCredentialCertificateSuccess = createAction<CredentialCertificateResponse>(
  `${name} createCredentialCertificateSuccess`,
)
export const createCredentialCertificateFailure = createAction<string>(`${name} createCredentialCertificateFailure`)

export const clearCredentialCertificate = createAction(`${name} clearCredentialCertificate`)

const CredentialCertificateReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setCredentialCertificate, (_state, action) => action.payload)
  builder.addCase(setCredentialItemId, (state, action) => mergeDeepRight(state)(action.payload))
  builder.addCase(clearCredentialCertificate, (_state, _action) => INITIAL_STATE)
})

export default CredentialCertificateReducer
