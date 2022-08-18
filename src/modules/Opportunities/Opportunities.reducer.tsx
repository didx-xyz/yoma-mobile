import { createAction, createReducer } from '@reduxjs/toolkit'

import {
  NormalisedOpportunities,
  OpportunitiesResponse,
  OpportunitiesState,
  opportunities,
} from './Opportunities.types'

const name = '[opportunities]'
export const INITIAL_STATE = {
  id: '',
  skills: [],
  countries: [],
  language: '',
  title: '',
  organisationName: '',
  organisationLogoURL: '',
  organisationURL: '',
  startTime: '',
  endTime: '',
  difficulty: '',
  timePeriod: '',
  timeValue: '',
  description: '',
  zltoReward: 999,
  totalZLTORewarded: 234,
} as OpportunitiesState

export const setOpportunities = createAction<NormalisedOpportunities>(`${name} setOpportunities`)
export const getOpportunitiesSuccess = createAction<opportunities[]>(`${name} getOpportunitiesSuccess`)
export const normaliseOpportunitiesSuccess = createAction<NormalisedOpportunities>(
  `${name} normaliseOpportunitiesSuccess`,
)
export const fetchOpportunities = createAction(`${name} fetchOpportunities`)
export const fetchOpportunitiesSuccess = createAction<OpportunitiesResponse>(`${name} fetchOpportunitiesSuccess`)
export const fetchOpportunitiesFailure = createAction<string>(`${name} fetchOpportunitiesFailure`)
export const clearOpportunities = createAction(`${name} clearOpportunities`)

const OpportunitiesReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setOpportunities, (_state, action) => action.payload)
  builder.addCase(clearOpportunities, (_state, _action) => INITIAL_STATE)
})

export default OpportunitiesReducer
