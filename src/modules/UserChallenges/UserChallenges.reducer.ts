import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeRight, omit } from 'ramda'

import { updateNormalisedReducer } from '../../redux/redux.utils'
import { types as UserTypes } from '../User'
import {
  CreateUserChallengePayload,
  CreateUserChallengeSuccessResponse,
  NormalisedUserChallenges,
  UserChallenge,
  UserChallengeFormValues,
  UserChallengesState,
} from './UserChallenges.types'

const name = '[User: Challenges]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
  formValues: undefined,
} as UserChallengesState

export const getUserChallengesSuccess = createAction<UserChallenge[]>(`${name} getUserChallengesSuccess`)
export const normaliseUserChallengesSuccess = createAction<NormalisedUserChallenges>(`${name} normaliseUserChallenges
Success`)
export const createUserChallenge = createAction<CreateUserChallengePayload>(`${name} createUserChallenge`)
export const createUserChallengeSuccess = createAction<CreateUserChallengeSuccessResponse>(
  `${name} createUserChallengeSuccess`,
)
export const createUserChallengeFailure = createAction<string>(`${name} createUserChallengeFailure`)

export const createUserChallengeCertificate = createAction<string>(`${name} createUserChallengeCertificate`)
export const createUserChallengeCertificateSuccess = createAction<UserTypes.UserCredentialMeta>(
  `${name} createUserChallengeCertificateSuccess`,
)
export const createUserChallengeCertificateFailure = createAction<string>(
  `${name} createUserChallengeCertificateFailure`,
)

export const setUserChallenges = createAction<NormalisedUserChallenges>(`${name} setUserChallenges`)

export const updateUserChallenges = createAction<NormalisedUserChallenges>(`${name} updateUserChallenges`)
export const clearUserChallenges = createAction(`${name} clearUserChallenges`)

export const setFormValues = createAction<UserChallengeFormValues>(`${name} setFormValues`)
export const clearFormValues = createAction(`${name} clearFormValues`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserChallenges, (_state, action) => action.payload)
  builder.addCase(updateUserChallenges, updateNormalisedReducer)
  builder.addCase(setFormValues, (state, action) => mergeRight(state, { formValues: action.payload }))
  builder.addCase(clearFormValues, (state, _action) => omit(['formValues'], state))
  builder.addCase(clearUserChallenges, (_state, _action) => INITIAL_STATE)
})

export default reducer
