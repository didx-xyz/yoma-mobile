import { createSelector } from '@reduxjs/toolkit'
import { prop } from 'ramda'
import { RootState } from 'redux/redux.types'

import { selectFilterSkillsByTerm } from './Skills.utils'

export const selectSkills = (state: RootState) => state.skills
export const selectEntities = createSelector(selectSkills, prop('entities'))
export const selectFiltered = createSelector(selectSkills, selectFilterSkillsByTerm)
