import { createSelector } from '@reduxjs/toolkit'
import { prop } from 'ramda'

import { RootState } from '../../redux/redux.types'

export const selectUserQualifications = (state: RootState) => state.userQualifications
export const selectFormValues = createSelector(selectUserQualifications, prop(['formValues']))
