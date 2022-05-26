import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, pipe, propOr } from 'ramda'

import { selectUserSkills } from '~/modules/UserSkills/UserSkills.selector'

export default createSelector(selectUserSkills, userSkills => {
  const count = userSkills.ids.length
  const ids = userSkills.ids
  const entities = pipe(
    map(
      applySpec({
        name: propOr('', 'skillName'),
        count: propOr(null, 'count'),
      }),
    ),
  )(userSkills.entities)

  return { userSkills: { ids, entities }, count }
})
