import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, mergeRight, pipe } from 'ramda'

import { types as CvViewCredentialTypes } from '~/components/CvViewCredential'
import { constants as UserConstants } from '~/modules/User'
import { selectors as UserJobsSelectors, types as UserJobsTypes } from '~/modules/UserJobs'

import { getExperienceMetadata } from './ExperienceView.utils'

const EXPERIENCE_VIEW_SELECTOR_SPEC = mergeRight(UserConstants.USER_CREDENTIAL_VIEW_SELECTOR_SPEC, {
  metadata: getExperienceMetadata,
})

export default createSelector<any, { userJobs: CvViewCredentialTypes.CvViewCredentialsData }>(
  UserJobsSelectors.selectUserJobs,
  (jobs: UserJobsTypes.NormalisedUserJobs) => {
    const ids = jobs.ids
    const entities = map(pipe(applySpec(EXPERIENCE_VIEW_SELECTOR_SPEC)))(jobs.entities)
    return { userJobs: { ids, entities } }
  },
)
