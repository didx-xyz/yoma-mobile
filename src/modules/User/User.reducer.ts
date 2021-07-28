import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

import { UpdateUserFailureResponse, UpdateUserResponse, UserPayload, UserResponse } from './User.types'

const name = '[User]'
export const INITIAL_STATE = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  countryAlpha2: '',
  phoneNumber: null,
  biography: '',
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

export const setUser = createAction<UserResponse>(`${name} setUser`)
export const clearUser = createAction(`${name} clearUser`)
export const updateUser = createAction<UserPayload>(`${name} updateUser`)
export const updateUserSuccess = createAction<UpdateUserResponse>(`${name} updateUserSuccess`)
export const updateUserFailure = createAction<UpdateUserFailureResponse>(`${name} updateUserFailure`)
export const uploadUserPhoto = createAction(`${name} uploadUserPhoto`)
export const uploadUserPhotoSuccess = createAction<any>(`${name} uploadUserPhotoSuccess`)
export const uploadUserPhotoFailure = createAction<string>(`${name} uploadUserPhotoFailure`)
export const updateUserPhotoSuccess = createAction(`${name} updateUserPhotoSuccess`)
export const updateUserPhotoFailure = createAction<UpdateUserFailureResponse>(`${name} updateUserPhotoFailure`)

const UserReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUser, (state, action) => mergeDeepRight(state)(action.payload))
  builder.addCase(clearUser, (_state, _action) => INITIAL_STATE)
})

export default UserReducer
