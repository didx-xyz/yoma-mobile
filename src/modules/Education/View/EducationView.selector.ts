import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, propOr } from 'ramda'

import { types as ApiUserTypes } from '~/api/users'
// destructured to avoid circular dependencies
import * as UserEducationSelectors from '~/modules/UserEducation/UserEducation.selector'
import * as UserEducationUtils from '~/modules/UserEducation/UserEducation.utils'
import type * as UserEducationTypes from '~/modules/UserEducation/types'

export default createSelector<any, UserEducationTypes.UserEducationViewCredentials>(
  UserEducationSelectors.selectUserEducationCredentials,
  (userEducation: UserEducationTypes.NormalisedUserEducation) => {
    const ids = userEducation.ids
    const entities = map(
      applySpec({
        title: pathOr('', [ApiUserTypes.UserCredentialTypes.Education, 'title']),
        description: pathOr('', [ApiUserTypes.UserCredentialTypes.Education, 'description']),
        iconUrl: path([ApiUserTypes.UserCredentialTypes.Education, 'organisationLogoURL']),
        isValidated: propOr(false, 'approved'),
        metadata: UserEducationUtils.getUserEducationMetadata,
      }),
    )(userEducation.entities)
    return { userEducation: { ids, entities } }
  },
)
