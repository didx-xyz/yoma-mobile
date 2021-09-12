import { createAction, createReducer } from '@reduxjs/toolkit'

import { Challenge, ChallengesState, NormalisedChallenges } from './Challenges.types'

const name = '[Challenges]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
} as ChallengesState

export const fetchChallenges = createAction(`${name} fetchChallenges`)
export const fetchChallengesSuccess = createAction<Challenge[]>(`${name} fetchChallengesSuccess`)
export const fetchChallengesFailure = createAction<string>(`${name} fetchChallengesFailure`)

export const normaliseChallengesSuccess = createAction<NormalisedChallenges>(`${name} normaliseChallengesSuccess`)
export const setChallenges = createAction<NormalisedChallenges>(`${name} setChallenges`)
export const clearChallenges = createAction(`${name} clearChallenges`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setChallenges, (_state, action) => action.payload)
  builder.addCase(clearChallenges, (_state, _action) => INITIAL_STATE)
})

export default reducer
