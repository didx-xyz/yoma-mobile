import { createSelector } from '@reduxjs/toolkit'
import { applySpec, isNil, map, not, pathOr, pipe, prop, propOr } from 'ramda'

import { RootState } from '../../redux/redux.types'
import { USER_CHALLENGES_STATE_KEY } from './UserChallenges.constants'

export const selectUserChallenges = (state: RootState) => state[USER_CHALLENGES_STATE_KEY]
export const selectUserChallengeIds = createSelector(selectUserChallenges, prop('ids'))
export const selectUserChallengeEntities = createSelector(selectUserChallenges, prop('entities'))

export default createSelector(selectUserChallenges, challengeData => {
  const challengeEntities = pipe(
    prop('entitie'),
    map(
      applySpec({
        name: pathOr('', ['challenge', 'name']),
        startDate: propOr('', 'startDate'),
        avatarUrl: pathOr('', ['challenge', 'url']),
        isValidated: pipe(not, isNil, propOr(null, 'verifiedAt')),
      }),
    ),
  )(challengeData)

  return {
    ids: challengeData.ids,
    entities: challengeEntities,
  }
})
