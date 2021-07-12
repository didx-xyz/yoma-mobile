import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

import { UserResponse } from './User.types'

const name = '[User]'
export const INITIAL_STATE = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  countryAlpha2: '',
  phoneNumber: null,
  biography: null,
  zltoWalletId: null,
  zltoBalance: 0,
  covidChallengeCertificateURL: null,
  tideChallengeCertificateURL: null,
  photoURL: null,
  organisationId: null,
  organisation: null,
  organisationVerified: false,
  createdAt: null,
  lastLogin: null,
}

export const fetchUserCredentials = createAction(`${name} fetchUserCredentials`)
export const fetchUserCredentialsSuccess = createAction<any>(`${name} fetchUserCredentialsSuccess`)
export const fetchUserCredentialsFailure = createAction<string>(`${name} fetchUserCredentialsFailure`)

export const setUser = createAction<UserResponse>(`${name} setUser`)

const UserReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUser, (state, action) => mergeDeepRight(state)(action.payload))
})

export default UserReducer
