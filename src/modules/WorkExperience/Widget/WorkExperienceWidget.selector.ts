import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, pick, pipe, slice } from 'ramda'

import { constants as UserConstants } from '~/modules/User'
import { selectors as UserWorkExperiencesSelectors } from '~/modules/UserWorkExperience'

export default createSelector(UserWorkExperiencesSelectors.selectUserWorkExperiences, userWorkExperiences => {
  const count = userWorkExperiences.ids.length
  const ids = slice(0, 2, userWorkExperiences.ids)
  const entities = pipe(
    pick(ids),
    map(applySpec(UserConstants.USER_CREDENTIAL_WIDGET_SELECTOR_SPEC)),
  )(userWorkExperiences.entities)

  return { userWorkExperiences: { ids, entities }, count }
})
