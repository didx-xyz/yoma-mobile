import { createSelector } from '@reduxjs/toolkit'
import { path } from 'ramda'
import { RootState } from 'redux/redux.types'

export const selectSkills = (state: RootState) => state.skills
export const selectSkillEntities = createSelector(selectSkills, path(['entities']))
export const selectFilteredSkills = createSelector(selectSkills, path(['filtered']))
