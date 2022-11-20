import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, mergeRight } from 'ramda'

import { types as CvViewCredentialTypes } from '~/components/CvViewCredential'
// importing directly to avoid circular dependencies
import * as UserConstants from '~/modules/User/User.constants'
import * as UserChallengesSelectors from '~/modules/UserChallenges/UserChallenges.selector'
import * as UserChallengesTypes from '~/modules/UserChallenges/UserChallenges.types'

import { getCompletedChallengesMetadata } from './CompletedChallengesView.utils'

const COMPLETED_CHALLENGES_VIEW_SELECTOR_SPEC = mergeRight(
  UserConstants.USER_OPPORTUNITY_CREDENTIAL_VIEW_SELECTOR_SPEC,
  {
    metadata: getCompletedChallengesMetadata,
  },
)

export default createSelector<any, { userChallenges: CvViewCredentialTypes.CvViewCredentialsData }>(
  UserChallengesSelectors.selectUserChallenges,
  (challenges: UserChallengesTypes.NormalisedUserChallenges) => {
    const ids = challenges.ids
    const entities = map(applySpec(COMPLETED_CHALLENGES_VIEW_SELECTOR_SPEC))(challenges.entities)
    return { userChallenges: { ids, entities } }
  },
)
