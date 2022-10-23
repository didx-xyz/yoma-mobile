import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeRight } from 'ramda'

import { Education } from '~/modules/Education/types'
import { types as UserTypes, utils as UserUtils } from '~/modules/User'
import * as ReduxUtils from '~/redux/redux.utils'

import {
  CreateUserEducationCertificatePayload,
  CreateUserEducationuccessResponse,
  NormalisedUserEducation,
  UserEducation,
  UserEducationState,
} from './UserEducation.types'

const name = '[User: Education]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
  formValues: {},
} as UserEducationState

export const getUserEducationSuccess = createAction<UserEducation[]>(`${name} getUserEducationSuccess`)
export const normaliseUserEducationSuccess = createAction<NormalisedUserEducation>(
  `${name} normaliseUserEducationSuccess`,
)

export const createUserEducation = createAction<Education>(`${name} createUserEducation`)
export const createUserEducationSuccess = createAction<CreateUserEducationuccessResponse>(
  `${name} createUserEducationSuccess`,
)
export const createUserEducationFailure = createAction<string>(`${name} createUserEducationFailure`)

export const setUserEducation = createAction<NormalisedUserEducation>(`${name} setUserEducation`)
export const updateUserEducation = createAction<NormalisedUserEducation>(`${name} updateUserEducation`)
export const clearUserEducation = createAction(`${name} clearUserEducation`)

export const createUserEducationCertificate = createAction<CreateUserEducationCertificatePayload>(
  `${name} createUserEducationCertificate`,
)
export const createUserEducationCertificateSuccess = createAction<UserTypes.UserCredentialMeta>(
  `${name} createUserEducationCertificateSuccess`,
)
export const createUserEducationCertificateFailure = createAction<string>(
  `${name} createUserEducationCertificateFailure`,
)

export const setUserEducationFormValues = createAction<UserTypes.UserCredentialFormValues>(
  `${name} setUserEducationFormValues`,
)
export const clearUserEducationFormValues = createAction(`${name} clearUserEducationFormValues`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserEducation, (state, action) => mergeRight(state.formValues, action.payload))
  builder.addCase(updateUserEducation, ReduxUtils.updateNormalisedReducer)
  builder.addCase(clearUserEducation, (_state, _action) => INITIAL_STATE)
  builder.addCase(setUserEducationFormValues, (state, action) => UserUtils.setFormValues(state, action.payload))
  builder.addCase(clearUserEducationFormValues, (state, _action) => mergeRight(state, { formValues: {} }))
})

export default reducer
