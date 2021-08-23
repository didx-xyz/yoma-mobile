import { createSelector } from '@reduxjs/toolkit'
import { path } from 'ramda'
import { RootState } from 'redux/redux.types'

import { extractFilteredSkillsByValue } from './Skills.utils'

export const selectSkills = (state: RootState) => state.skills
export const selectEntities = createSelector(selectSkills, path(['entities']))
export const selectFiltered = createSelector(selectSkills, extractFilteredSkillsByValue)
