import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, propOr } from 'ramda'

import { types as ApiUserTypes } from '~/api/users'
import { selectors as UserEducationSelectors, utils as UserEducationUtils } from '~/modules/UserEducation'
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
