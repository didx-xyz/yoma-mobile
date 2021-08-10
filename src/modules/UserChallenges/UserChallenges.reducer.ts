import { createAction, createReducer } from '@reduxjs/toolkit'

import { NormalisedChallenges, UserChallenge, UserChallengesState } from './UserChallenges.types'

const name = '[User: Challenges]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
} as UserChallengesState

export const getUserChallengesSuccess = createAction<UserChallenge[]>(`${name} getUserChallengesSuccess`)
export const normaliseUserChallengesSuccess = createAction<NormalisedChallenges>(
  `${name} normaliseUserChallengesSuccess`,
)
export const setUserChallenges = createAction<NormalisedChallenges>(`${name} setUserChallenges`)
export const clearUserChallenges = createAction(`${name} clearUserChallenges`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserChallenges, (_state, action) => action.payload)
  builder.addCase(clearUserChallenges, (_state, _action) => INITIAL_STATE)
})

export default reducer
