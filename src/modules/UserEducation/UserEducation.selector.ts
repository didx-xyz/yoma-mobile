import { createSelector } from '@reduxjs/toolkit'
import { pick, prop } from 'ramda'

import { RootState } from '~/redux/redux.types'

import { NormalisedUserEducation } from './UserEducation.types'

export const selectUserEducation = (state: RootState) => state.userEducation

export const selectUserEducationCredentials = createSelector<any, NormalisedUserEducation>(
  selectUserEducation,
  pick(['ids', 'entities']),
)
export const selectFormValues = createSelector(selectUserEducation, prop(['formValues']))
export const selectFormCertificate = createSelector(selectFormValues, prop('certificate'))
