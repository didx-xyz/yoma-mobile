import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'redux/redux.types'

export const selectState = (state: RootState) => state
export default createSelector(selectState, ({ qualifications, skills, organisations }) => ({
  qualifications,
  skills,
  organisations,
}))
