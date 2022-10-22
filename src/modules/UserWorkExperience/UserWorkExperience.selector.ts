import { createSelector } from '@reduxjs/toolkit'
import { prop } from 'ramda'

import { RootState } from '~/redux/redux.types'

export const selectUserWorkExperiences = (state: RootState) => state.userWorkExperiences
export const selectFormValues = createSelector(selectUserWorkExperiences, prop(['formValues']))
