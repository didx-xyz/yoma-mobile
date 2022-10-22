import { createAction, createReducer } from '@reduxjs/toolkit'
import { mergeRight } from 'ramda'

import { UserCredentialFormValues } from '~/modules/User/User.types'
import { setFormValues } from '~/modules/User/User.utils'
import { updateNormalisedReducer } from '~/redux/redux.utils'

import { WorkExperience } from '../WorkExperience/WorkExperience.types'
import {
  NormalisedUserWorkExperience,
  UserWorkExperienceCredential,
  UserWorkExperienceResponse,
  UserWorkExperienceState,
} from './UserWorkExperience.types'

const name = '[User: Work Experience]'

export const INITIAL_STATE = {
  ids: [],
  entities: {},
  formValues: {},
} as UserWorkExperienceState

export const getUserWorkExperienceSuccess = createAction<UserWorkExperienceCredential[]>(
  `${name} getUserWorkExperienceSuccess`,
)
export const normaliseUserWorkExperienceSuccess = createAction<NormalisedUserWorkExperience>(
  `${name} normaliseUserWorkExperienceSuccess`,
)

export const fetchUserWorkExperienceById = createAction<string>(`${name} fetchUserWorkExperienceById`)
export const fetchUserWorkExperienceByIdFailure = createAction<string>(`${name} fetchUserWorkExperienceByIdFailure`)
export const fetchUserWorkExperienceByIdSuccess = createAction<any>(`${name} fetchUserWorkExperienceByIdSuccess`)

export const createUserWorkExperience = createAction<WorkExperience>(`${name} createUserWorkExperience`)
export const createUserWorkExperienceSuccess = createAction<UserWorkExperienceResponse>(
  `${name} createUserWorkExperienceSuccess`,
)
export const createUserWorkExperienceFailure = createAction<string>(`${name} createUserWorkExperienceFailure`)

export const setUserWorkExperiences = createAction<NormalisedUserWorkExperience>(`${name} setUserWorkExperiences`)
export const updateUserWorkExperiences = createAction<NormalisedUserWorkExperience>(`${name} updateUserWorkExperiences`)
export const clearUserWorkExperiences = createAction(`${name} clearUserWorkExperiences`)
export const setUserWorkExperiencesFormValues = createAction<UserCredentialFormValues>(
  `${name} setUserWorkExperiencesFormValues`,
)
export const clearUserWorkExperiencesFormValues = createAction(`${name} clearUserWorkExperiencesFormValues`)

const reducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(setUserWorkExperiences, (state, action) =>
    mergeRight({ formValues: state.formValues }, action.payload),
  )
  builder.addCase(updateUserWorkExperiences, updateNormalisedReducer)
  builder.addCase(clearUserWorkExperiences, (_state, _action) => INITIAL_STATE)
  builder.addCase(setUserWorkExperiencesFormValues, (state, action) => setFormValues(state, action.payload))
  builder.addCase(clearUserWorkExperiencesFormValues, (state, _action) => mergeRight(state, { formValues: {} }))
})

export default reducer
