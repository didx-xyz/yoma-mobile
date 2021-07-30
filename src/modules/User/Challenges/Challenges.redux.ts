import { createAction, createReducer } from '@reduxjs/toolkit'

const name = '[User Challenges]'
const INITIAL_STATE = [] as any

export const getChallengesSuccess = createAction<any[]>(`${name} getChallengesSuccess`)
export const prepareChallenges = createAction<any[]>(`${name} prepareChallenges`)
export const normalisedChallenges = createAction<any[]>(`${name} prepareChallenges`)
export const setChallenges = createAction<any[]>(`${name} setChallenges`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setChallenges, (_state, action) => action.payload)
})

export default reducer
