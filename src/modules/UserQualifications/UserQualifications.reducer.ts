import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeRight } from 'ramda'

import * as ReduxUtils from '~/redux/redux.utils'

import { Qualification } from '../Qualifications/Qualifications.types'
import { types as UserTypes } from '../User'
import { UserCredentialFormValues } from '../User/User.types'
import { setFormValues } from '../User/User.utils'
import {
  CreateUserQualificationCertificatePayload,
  CreateUserQualificationSuccessResponse,
  NormalisedUserQualifications,
  UserQualification,
  UserQualificationsState,
} from './UserQualifications.types'

const name = '[User: Qualifications]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
  formValues: {},
} as UserQualificationsState

export const getUserQualificationsSuccess = createAction<UserQualification[]>(`${name} getUserQualificationsSuccess`)
export const normaliseUserQualificationsSuccess = createAction<NormalisedUserQualifications>(
  `${name} normaliseUserQualificationsSuccess`,
)

export const createUserQualification = createAction<Qualification>(`${name} createUserQualification`)
export const createUserQualificationSuccess = createAction<CreateUserQualificationSuccessResponse>(
  `${name} createUserQualificationSuccess`,
)
export const createUserQualificationFailure = createAction<string>(`${name} createUserQualificationFailure`)

export const setUserQualifications = createAction<NormalisedUserQualifications>(`${name} setUserQualifications`)
export const updateUserQualifications = createAction<NormalisedUserQualifications>(`${name} updateUserQualifications`)
export const clearUserQualifications = createAction(`${name} clearUserQualifications`)

export const createUserQualificationCertificate = createAction<CreateUserQualificationCertificatePayload>(
  `${name} createUserQualificationCertificate`,
)
export const createUserQualificationCertificateSuccess = createAction<UserTypes.UserCredentialMeta>(
  `${name} createUserQualificationCertificateSuccess`,
)
export const createUserQualificationCertificateFailure = createAction<string>(
  `${name} createUserQualificationCertificateFailure`,
)

export const setUserQualificationFormValues = createAction<UserCredentialFormValues>(
  `${name} setUserQualificationFormValues`,
)
export const clearUserQualificationFormValues = createAction(`${name} clearUserQualificationFormValues`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserQualifications, (state, action) => mergeRight(state.formValues, action.payload))
  builder.addCase(updateUserQualifications, ReduxUtils.updateNormalisedReducer)
  builder.addCase(clearUserQualifications, (_state, _action) => INITIAL_STATE)
  builder.addCase(setUserQualificationFormValues, (state, action) => setFormValues(state, action.payload))
  builder.addCase(clearUserQualificationFormValues, (state, _action) => mergeRight(state, { formValues: {} }))
})

export default reducer
