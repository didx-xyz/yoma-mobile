import { createSelector } from '@reduxjs/toolkit'
import { prop } from 'ramda'

import { RootState } from '../../redux/redux.types'
import { USER_CHALLENGES_STATE_KEY } from './UserChallenges.constants'

export const selectUserChallenges = (state: RootState) => state[USER_CHALLENGES_STATE_KEY]
export const selectUserChallengeIds = createSelector(selectUserChallenges, prop('ids'))
export const selectUserChallengeEntities = createSelector(selectUserChallenges, prop('entities'))
// adjust this ^^  to construct the data I need in the widget objects

export default createSelector(selectUserChallenges, challenges => ({
  challenges,
}))
