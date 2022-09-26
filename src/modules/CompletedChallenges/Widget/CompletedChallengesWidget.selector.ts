import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, pick, pipe, propOr, slice } from 'ramda'

import { selectUserChallenges } from '~/modules/UserChallenges/UserChallenges.selector'

export default createSelector(selectUserChallenges, userChallenges => {
  const count = userChallenges.ids.length
  const ids = slice(0, 2, userChallenges.ids)
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
  )(userChallenges.entities)

  return { userChallenges: { ids, entities }, count }
})
