import { createSelector } from '@reduxjs/toolkit'
import { pathOr } from 'ramda'

import { RootState } from '../../redux/redux.types'

export const selectUserChallenges = (state: RootState) => state.userChallenges
export const selectFormCertificate = createSelector(selectUserChallenges, pathOr(null, ['formValues', 'certificate']))
