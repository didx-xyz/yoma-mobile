import { createSelector } from '@reduxjs/toolkit'
import { pick, prop } from 'ramda'

import { RootState } from '~/redux/redux.types'

import { NormalisedUserQualifications } from './UserQualifications.types'

export const selectUserQualifications = (state: RootState) => state.userQualifications
export const selectUserQualificationCredentials = createSelector<any, NormalisedUserQualifications>(
  selectUserQualifications,
  pick(['ids', 'entities']),
)
export const selectFormValues = createSelector(selectUserQualifications, prop(['formValues']))
export const selectFormCertificate = createSelector(selectFormValues, prop('certificate'))
