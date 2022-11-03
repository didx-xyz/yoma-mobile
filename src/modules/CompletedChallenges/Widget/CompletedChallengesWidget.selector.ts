import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, pick, pipe, slice } from 'ramda'

import * as UserConstants from '~/modules/User/User.constants'
import { selectUserChallenges } from '~/modules/UserChallenges/UserChallenges.selector'

export default createSelector(selectUserChallenges, userChallenges => {
  const count = userChallenges.ids.length
  const ids = slice(0, 2, userChallenges.ids)
  const entities = pipe(
    pick(ids),
    map(applySpec(UserConstants.USER_CREDENTIAL_WIDGET_SELECTOR_SPEC)),
  )(userChallenges.entities)

  return { userChallenges: { ids, entities }, count }
})
