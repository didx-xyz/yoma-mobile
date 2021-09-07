import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, pick, pipe, propOr, slice } from 'ramda'

import { selectUserQualifications } from '../../UserQualifications/UserQualifications.selector'

export default createSelector(selectUserQualifications, userQualifications => {
  const count = userQualifications.ids.length
  const ids = slice(0, 2, userQualifications.ids)
  const entities = pipe(
    pick(ids),
    map(
      applySpec({
        name: pathOr('', ['qualification', 'title']),
        startDate: propOr('', 'startDate'),
        organisationLogoURL: path(['qualification', 'organisationLogoURL']),
        isValidated: propOr(false, 'approved'),
      }),
    ),
  )(userQualifications.entities)

  return { userQualifications: { ids, entities }, count }
})
