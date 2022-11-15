import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, propOr } from 'ramda'

import { types as ApiUserTypes } from '~/api/users'
import type { types as CvViewCredentialTypes } from '~/components/CvViewCredential'
import * as UserWorkExperiencesSelectors from '~/modules/UserWorkExperience/UserWorkExperience.selector'
import type { types as UserWorkExperiencesTypes } from '~/modules/UserWorkExperience/types'

import { getExperienceMetadata } from './WorkExperienceView.utils'

export default createSelector<any, { userWorkExperiences: CvViewCredentialTypes.CvViewCredentialsData }>(
  UserWorkExperiencesSelectors.selectUserWorkExperiences,
  (workExperiences: UserWorkExperiencesTypes.NormalisedUserWorkExperience) => {
    const ids = workExperiences.ids
    const entities = map(
      applySpec({
        title: pathOr('', [ApiUserTypes.UserCredentialTypes.WorkExperience, 'title']),
        description: pathOr('', [ApiUserTypes.UserCredentialTypes.WorkExperience, 'description']),
        iconUrl: path([ApiUserTypes.UserCredentialTypes.WorkExperience, 'organisationLogoURL']),
        isValidated: propOr(false, 'approved'),
        metadata: getExperienceMetadata,
      }),
    )(workExperiences.entities)
    return { userWorkExperiences: { ids, entities } }
  },
)
