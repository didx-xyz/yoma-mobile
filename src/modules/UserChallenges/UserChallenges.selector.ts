import { createSelector } from '@reduxjs/toolkit'
import { applySpec, evolve, map, objOf, path, pathOr, pipe, propOr } from 'ramda'

import { RootState } from '../../redux/redux.types'

export const selectUserChallenges = (state: RootState) => state.userChallenges

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
    objOf('challenges'),
  ),
)
