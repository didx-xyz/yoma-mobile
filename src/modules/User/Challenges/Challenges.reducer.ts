import { createAction, createReducer } from '@reduxjs/toolkit'

import { Challenge } from './types'

const name = '[User Challenges]'
export const INITIAL_STATE = [] as Challenge[]

export const getChallengesSuccess = createAction<any[]>(`${name} getChallengesSuccess`)
export const prepareChallenges = createAction<any[]>(`${name} prepareChallenges`)
export const normalisedChallenges = createAction<any[]>(`${name} prepareChallenges`)
export const setChallenges = createAction<any[]>(`${name} setChallenges`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setChallenges, (_state, action) => action.payload)
})

export default reducer
