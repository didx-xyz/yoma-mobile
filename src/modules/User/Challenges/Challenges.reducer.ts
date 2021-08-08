import { createAction, createReducer } from '@reduxjs/toolkit'

import { NormalisedChallenges, UserChallenge, UserChallengesState } from './Challenges.types'

const name = '[User Challenges]'
export const INITIAL_STATE = {
  ids: [],
  entities: {},
} as UserChallengesState

export const getChallengesSuccess = createAction<UserChallenge[]>(`${name} getChallengesSuccess`)
export const normaliseChallengesSuccess = createAction<NormalisedChallenges>(`${name} normaliseChallengesSuccess`)
export const setChallenges = createAction<NormalisedChallenges>(`${name} setChallenges`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setChallenges, (_state, action) => action.payload)
})

export default reducer
