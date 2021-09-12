import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, pipe, propOr } from 'ramda'

import { selectUserSkills } from '../../UserSkills/UserSkills.selector'

export default createSelector(selectUserSkills, userSkills => {
  const ids = userSkills.ids
  const entities = pipe(
    map(
      applySpec({
        name: propOr('', 'skillName'),
      }),
    ),
  )(userSkills.entities)

  return { userSkills: { ids, entities } }
})
