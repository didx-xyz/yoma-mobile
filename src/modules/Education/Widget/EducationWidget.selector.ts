import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map } from 'ramda'

import * as UserTypes from '~/modules/User/User.types'
import * as UserUtils from '~/modules/User/User.utils'
import { selectUserEducationCredentials } from '~/modules/UserEducation/UserEducation.selector'
import type { NormalisedUserEducation, UserEducationWidgetSelector } from '~/modules/UserEducation/UserEducation.types'

export default createSelector<any, UserEducationWidgetSelector>(
  selectUserEducationCredentials,
  (userEducation: NormalisedUserEducation) => {
    const count = userEducation.ids.length
    const ids = userEducation.ids
    const entities = map(applySpec(UserUtils.getUserCredentialWidgetSelectorSpec(UserTypes.CredentialTypes.Education)))(
      userEducation.entities,
    )

    return { userEducation: { ids, entities }, count }
  },
)
