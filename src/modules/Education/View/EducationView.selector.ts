import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, mergeRight, path, pathOr, propOr } from 'ramda'

import { constants as UserConstants } from '~/modules/User'
import { types as UserEducationTypes, utils as UserEducationUtils } from '~/modules/UserEducation'

const USER_EDUCATION_VIEW_SELECTOR_SPEC = mergeRight(UserConstants.USER_OPPORTUNITY_CREDENTIAL_VIEW_SELECTOR_SPEC, {
  metadata: UserEducationUtils.getUserEducationMetadata,
  title: pathOr('', ['opportunity', 'title']),
  description: pathOr('', ['opportunity', 'description']),
  iconUrl: path(['opportunity', 'organisationLogoURL']),
  isValidated: propOr(false, 'approved'),
})

const selectUserEducationCredentialsView = (selector: any) =>
  createSelector<any, UserEducationTypes.UserEducationViewCredentials>(
    selector,
    (userEducation: UserEducationTypes.NormalisedUserEducation) => {
      const ids = userEducation.ids
      const entities = map(applySpec(USER_EDUCATION_VIEW_SELECTOR_SPEC))(userEducation.entities)
      return { userEducation: { ids, entities } }
    },
  )

export default selectUserEducationCredentialsView
