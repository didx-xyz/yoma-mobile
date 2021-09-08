import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, pick, pipe, propOr, slice } from 'ramda'

import { selectUserSkills } from '../../UserSkills/UserSkills.selector'

export default createSelector(selectUserSkills, userSkills => {
  const count = userSkills.ids.length
  const ids = slice(0, 2, userSkills.ids)
  const entities = pipe(
    pick(ids),
    map(
      applySpec({
        name: pathOr('', ['job', 'title']),
        startDate: propOr('', 'startDate'),
        organisationLogoURL: path(['skill', 'organisationLogoURL']),
        isValidated: propOr(false, 'approved'),
      }),
    ),
  )(userSkills.entities)

  return { userSkills: { ids, entities }, count }
})
