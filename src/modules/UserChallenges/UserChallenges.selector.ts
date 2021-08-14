import { createSelector } from '@reduxjs/toolkit'
import { applySpec, evolve, map, path, pathOr, pipe, propOr } from 'ramda'

import { RootState } from '../../redux/redux.types'
import { USER_CHALLENGES_STATE_KEY } from './UserChallenges.constants'

export const selectUserChallenges = (state: RootState) => state[USER_CHALLENGES_STATE_KEY]

export default createSelector(
  selectUserChallenges,
  pipe(
    evolve({
      entities: map(
        applySpec({
          name: pathOr('', ['challenge', 'name']),
          startDate: propOr('', 'startDate'),
          avatarUrl: path(['challenge', 'url']),
          isValidated: propOr(false, 'approved'),
        }),
      ),
    }),
  ),
)
