import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, pick, pipe, slice } from 'ramda'

import { constants as UserConstants } from '~/modules/User'
// importing directly to solve circular references
import * as UserWorkExperiencesSelectors from '~/modules/UserWorkExperience/UserWorkExperience.selector'

export default createSelector(UserWorkExperiencesSelectors.selectUserWorkExperiences, userWorkExperiences => {
  const count = userWorkExperiences.ids.length
  const ids = slice(0, 2, userWorkExperiences.ids)
  const entities = pipe(
    pick(ids),
    map(applySpec(UserConstants.USER_OPPORTUNITY_CREDENTIAL_WIDGET_SELECTOR_SPEC)),
  )(userWorkExperiences.entities)

  return { userWorkExperiences: { ids, entities }, count }
})
