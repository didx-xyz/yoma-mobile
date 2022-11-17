import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, mergeRight } from 'ramda'

import { CredentialTypes } from '~/modules/User/User.types'
import { getUserCredentialViewSelectorSpec } from '~/modules/User/User.utils'
// destructured to avoid circular dependencies
import * as UserEducationSelectors from '~/modules/UserEducation/UserEducation.selector'
import { getUserEducationMetadata } from '~/modules/UserEducation/UserEducation.utils'
import type * as UserEducationTypes from '~/modules/UserEducation/types'

export default createSelector<any, UserEducationTypes.UserEducationViewCredentials>(
  UserEducationSelectors.selectUserEducationCredentials,
  (userEducation: UserEducationTypes.NormalisedUserEducation) => {
    const ids = userEducation.ids
    const entities = map(
      applySpec(
        mergeRight(getUserCredentialViewSelectorSpec(CredentialTypes.Education), {
          metadata: getUserEducationMetadata,
        }),
      ),
    )(userEducation.entities)
    return { userEducation: { ids, entities } }
  },
)
