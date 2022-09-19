import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, pick, pipe, slice } from 'ramda'

import { constants as UserConstants } from '~/modules/User'
import { selectors as UserJobsSelectors } from '~/modules/UserJobs'

export default createSelector(UserJobsSelectors.selectUserJobs, userJobs => {
  const count = userJobs.ids.length
  const ids = slice(0, 2, userJobs.ids)
  const entities = pipe(
    pick(ids),
    map(applySpec(UserConstants.USER_CREDENTIAL_WIDGET_SELECTOR_SPEC)),
  )(userJobs.entities)

  return { userJobs: { ids, entities }, count }
})
