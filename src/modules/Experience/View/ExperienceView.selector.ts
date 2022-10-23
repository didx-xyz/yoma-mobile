import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, mergeRight } from 'ramda'

import { types as CvViewCredentialTypes } from '~/components/CvViewCredential'
import { constants as UserConstants } from '~/modules/User'
import {
  selectors as UserWorkExperiencesSelectors,
  types as UserWorkExperiencesTypes,
} from '~/modules/UserWorkExperience'

import { getExperienceMetadata } from './ExperienceView.utils'

const EXPERIENCE_VIEW_SELECTOR_SPEC = mergeRight(UserConstants.USER_OPPORTUNITY_CREDENTIAL_VIEW_SELECTOR_SPEC, {
  metadata: getExperienceMetadata,
})

export default createSelector<any, { userWorkExperiences: CvViewCredentialTypes.CvViewCredentialsData }>(
  UserWorkExperiencesSelectors.selectUserWorkExperiences,
  (workExperiences: UserWorkExperiencesTypes.NormalisedUserWorkExperience) => {
    const ids = workExperiences.ids
    const entities = map(applySpec(EXPERIENCE_VIEW_SELECTOR_SPEC))(workExperiences.entities)
    return { userWorkExperiences: { ids, entities } }
  },
)
