import { createAction, createReducer } from '@reduxjs/toolkit'

import { updateNormalisedState } from '../../utils/redux.utils'
import { types as CompletedChallengesFormTypes } from '../CompletedChallenges/Form'
import {
  CreateUserChallengeSuccessResponse,
  NormalisedUserChallenges,
  UserChallenge,
  UserChallengesState,
} from './UserChallenges.types'

const name = '[User: Challenges]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
} as UserChallengesState

export const getUserChallengesSuccess = createAction<UserChallenge[]>(`${name} getUserChallengesSuccess`)
export const normaliseUserChallengesSuccess = createAction<NormalisedUserChallenges>(`${name} normaliseUserChallenges
Success`)
export const createUserChallenge = createAction<CompletedChallengesFormTypes.FormFields>(`${name} createUserChallenge`)
export const createUserChallengeSuccess = createAction<CreateUserChallengeSuccessResponse>(
  `${name} createUserChallengeSuccess`,
)
export const createUserChallengeFailure = createAction<string>(`${name} createUserChallengeFailure`)

export const fetchUserChallengeById = createAction<string>(`${name} fetchUserChallengeById`)
export const fetchUserChallengeByIdFailure = createAction<string>(`${name} fetchUserChallengeByIdFailure`)
export const fetchUserChallengeByIdSuccess = createAction<any>(`${name} fetchUserChallengeByIdSuccess`)

export const setUserChallenges = createAction<NormalisedUserChallenges>(`${name} setUserChallenges`)
export const updateUserChallenges = createAction<NormalisedUserChallenges>(`${name} updateUserChallenges`)
export const clearUserChallenges = createAction(`${name} clearUserChallenges`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserChallenges, (_state, action) => action.payload)
  builder.addCase(updateUserChallenges, (state: UserChallengesState, action) =>
    updateNormalisedState(state, action.payload),
  )
  builder.addCase(clearUserChallenges, (_state, _action) => INITIAL_STATE)
})

export default reducer
