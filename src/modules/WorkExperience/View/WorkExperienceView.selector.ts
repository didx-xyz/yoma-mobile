import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, mergeRight } from 'ramda'

import type { types as CvViewCredentialTypes } from '~/components/CvViewCredential'
import { CredentialTypes } from '~/modules/User/User.types'
import { getUserCredentialViewSelectorSpec } from '~/modules/User/User.utils'
import * as UserWorkExperiencesSelectors from '~/modules/UserWorkExperience/UserWorkExperience.selector'
import { getUserWorkExperienceMetadata } from '~/modules/UserWorkExperience/UserWorkExperience.utils'
import type { types as UserWorkExperiencesTypes } from '~/modules/UserWorkExperience/types'

export default createSelector<any, { userWorkExperiences: CvViewCredentialTypes.CvViewCredentialsData }>(
  UserWorkExperiencesSelectors.selectUserWorkExperiences,
  (workExperiences: UserWorkExperiencesTypes.NormalisedUserWorkExperience) => {
    const ids = workExperiences.ids
    const entities = map(
      applySpec(
        mergeRight(getUserCredentialViewSelectorSpec(CredentialTypes.WorkExperience), {
          metadata: getUserWorkExperienceMetadata,
        }),
      ),
    )(workExperiences.entities)
    return { userWorkExperiences: { ids, entities } }
  },
)
