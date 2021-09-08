import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, pick, pipe, propOr, slice } from 'ramda'

import { selectUserJobs } from '../../UserJobs/UserJobs.selector'

export default createSelector(selectUserJobs, userJobs => {
  const count = userJobs.ids.length
  const ids = slice(0, 2, userJobs.ids)
  const entities = pipe(
    pick(ids),
    map(
      applySpec({
        name: pathOr('', ['job', 'title']),
        startDate: propOr('', 'startDate'),
        organisationLogoURL: path(['job', 'organisationLogoURL']),
        isValidated: propOr(false, 'approved'),
      }),
    ),
  )(userJobs.entities)

  return { userJobs: { ids, entities }, count }
})
