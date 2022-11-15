import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, pick, pipe, slice } from 'ramda'

import { UserCredentialTypes } from '~/api/users/users.types'
import { utils as UserUtils } from '~/modules/User'
import { selectors as UserWorkExperiencesSelectors } from '~/modules/UserWorkExperience'

export default createSelector(UserWorkExperiencesSelectors.selectUserWorkExperiences, userWorkExperiences => {
  const count = userWorkExperiences.ids.length
  const ids = slice(0, 2, userWorkExperiences.ids)
  const entities = pipe(
    pick(ids),
    map(applySpec(UserUtils.getUserCredentialWidgetSelectorSpec(UserCredentialTypes.WorkExperience))),
  )(userWorkExperiences.entities)

  return { userWorkExperiences: { ids, entities }, count }
})
