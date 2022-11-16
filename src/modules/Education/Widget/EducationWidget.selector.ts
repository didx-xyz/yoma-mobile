import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map } from 'ramda'

import { types as ApiUserTypes } from '~/api/users'
import { utils as UserUtils } from '~/modules/User'
import { selectUserEducationCredentials } from '~/modules/UserEducation/UserEducation.selector'
import type { NormalisedUserEducation, UserEducationWidgetSelector } from '~/modules/UserEducation/UserEducation.types'

import { CredentialTypes } from '../../User/User.types'

export default createSelector<any, UserEducationWidgetSelector>(
  selectUserEducationCredentials,
  (userEducation: NormalisedUserEducation) => {
    const count = userEducation.ids.length
    const ids = userEducation.ids
    const entities = map(applySpec(UserUtils.getUserCredentialWidgetSelectorSpec(CredentialTypes.Education)))(
      userEducation.entities,
    )

    return { userEducation: { ids, entities }, count }
  },
)
