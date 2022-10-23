import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, pick, pipe, slice } from 'ramda'

import { constants as UserConstants } from '~/modules/User'
import * as UserEducationSelectors from '~/modules/UserEducation/UserEducation.selector'

export default createSelector(UserEducationSelectors.selectUserEducation, userEducation => {
  const count = userEducation.ids.length
  const ids = slice(0, 2, userEducation.ids)
  const entities = pipe(
    pick(ids),
    map(applySpec(UserConstants.USER_OPPORTUNITY_CREDENTIAL_WIDGET_SELECTOR_SPEC)),
  )(userEducation.entities)

  return { userEducation: { ids, entities }, count }
})
