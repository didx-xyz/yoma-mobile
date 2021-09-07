import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, pick, pipe, propOr, slice } from 'ramda'

import { selectUserQualifications } from '../../UserQualifications/UserQualifications.selector'

export default createSelector(selectUserQualifications, qualifications => {
  const ids = slice(0, 2, qualifications.ids)
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
  )(qualifications.entities)

  return { qualifications: { ids, entities } }
})
