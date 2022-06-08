import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, pipe, propOr } from 'ramda'

import { types as CvViewCredentialTypes } from '~/components/CvViewCredential'
import { selectUserChallenges } from '~/modules/UserChallenges/UserChallenges.selector'
import { NormalisedUserChallenges } from '~/modules/UserChallenges/UserChallenges.types'

import { getCompletedChallengesMetadata } from './CompletedChallengesView.utils'

export default createSelector<any, { userChallenges: CvViewCredentialTypes.CvViewCredentialsData }>(
  selectUserChallenges,
  (challenges: NormalisedUserChallenges) => {
    const ids = challenges.ids
    const entities = map(
      pipe(
        applySpec({
          title: pathOr('', ['challenge', 'name']),
          metadata: getCompletedChallengesMetadata,
          description: pathOr('', ['challenge', 'description']),
          iconUrl: path(['challenge', 'organisationLogoURL']),
          isValidated: propOr(false, 'approved'),
        }),
      ),
    )(challenges.entities)
    return { userChallenges: { ids, entities } }
  },
)
