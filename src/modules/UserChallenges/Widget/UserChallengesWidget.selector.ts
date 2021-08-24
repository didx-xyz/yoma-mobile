import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, pick, pipe, propOr, slice } from 'ramda'

import { selectUserChallenges } from '../UserChallenges.selector'

export default createSelector(selectUserChallenges, challenges => {
  const ids = slice(0, 2, challenges.ids)
  const entities = pipe(
    pick(ids),
    map(
      applySpec({
        name: pathOr('', ['challenge', 'name']),
        startDate: propOr('', 'startDate'),
        organisationLogoURL: path(['challenge', 'organisationLogoURL']),
        isValidated: propOr(false, 'approved'),
      }),
    ),
  )(challenges.entities)

  return { challenges: { ids, entities } }
})
