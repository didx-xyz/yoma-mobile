import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeDeepRight } from 'ramda'

import { types as AboutFormTypes } from '~/modules/About/Form'
import { types as ProfileTypes } from '~/modules/Profile'

import {
  UpdateUserFailureResponse,
  UpdateUserResponse,
  UserDetails,
  UserDetailsResponse,
  UserResponse,
} from './User.types'

const name = '[User]'
export const INITIAL_STATE: UserDetails = {
  id: '',
  firstName: '',
  lastName: '',
  name: '',
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

export const fetchUserCredentials = createAction(`${name} fetchUserCredentials`)
export const fetchUserCredentialsSuccess = createAction<any>(`${name} fetchUserCredentialsSuccess`)
export const fetchUserCredentialsFailure = createAction<string>(`${name} fetchUserCredentialsFailure`)

export const fetchUserDetails = createAction(`${name} fetchUserDetails`)
export const fetchUserDetailsSuccess = createAction<UserDetailsResponse>(`${name} fetchUserDetailsSuccess`)
export const fetchUserDetailsFailure = createAction(`${name} fetchUserDetailsFailure`)

export const hydrateUser = createAction(`${name} hydrateUser`)

export const setUser = createAction<UserResponse>(`${name} setUser`)
export const clearUser = createAction(`${name} clearUser`)
export const updateUser = createAction<ProfileTypes.FormFields | AboutFormTypes.FormFields>(`${name} updateUser`)
export const updateUserSuccess = createAction<UpdateUserResponse>(`${name} updateUserSuccess`)
export const updateUserFailure = createAction<UpdateUserFailureResponse>(`${name} updateUserFailure`)
export const uploadUserPhoto = createAction(`${name} uploadUserPhoto`)
export const uploadUserPhotoSuccess = createAction<any>(`${name} uploadUserPhotoSuccess`)
export const uploadUserPhotoFailure = createAction<string>(`${name} uploadUserPhotoFailure`)
export const updateUserPhotoSuccess = createAction(`${name} updateUserPhotoSuccess`)
export const updateUserPhotoFailure = createAction<UpdateUserFailureResponse>(`${name} updateUserPhotoFailure`)

const userReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUser, (state, action) => mergeDeepRight(state)(action.payload))
  builder.addCase(clearUser, (_state, _action) => INITIAL_STATE)
})

export default userReducer
