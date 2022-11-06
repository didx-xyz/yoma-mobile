import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map } from 'ramda'

import { constants as UserConstants } from '~/modules/User'
import { selectUserEducationCredentials } from '~/modules/UserEducation/UserEducation.selector'
import type { NormalisedUserEducation, UserEducationWidgetSelector } from '~/modules/UserEducation/UserEducation.types'

export default createSelector<any, UserEducationWidgetSelector>(
  selectUserEducationCredentials,
  (userEducation: NormalisedUserEducation) => {
    const count = userEducation.ids.length
    const ids = userEducation.ids
    const entities = map(applySpec(UserConstants.USER_CREDENTIAL_WIDGET_SELECTOR_SPEC))(userEducation.entities)

    return { userEducation: { ids, entities }, count }
  },
)
