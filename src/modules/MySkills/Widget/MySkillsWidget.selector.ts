import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, pick, pipe, propOr, slice } from 'ramda'

import { selectUserSkills } from '../../UserSkills/UserSkills.selector'

export default createSelector(selectUserSkills, userSkills => {
  const count = userSkills.ids.length
  const ids = slice(0, 3, userSkills.ids)
  const entities = pipe(
    pick(ids),
    map(
      applySpec({
        name: propOr('', 'skillName'),
        count: propOr(1, 'count'),
      }),
    ),
  )(userSkills.entities)

  return { userSkills: { ids, entities }, count }
})
