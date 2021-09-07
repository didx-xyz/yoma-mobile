import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, pipe, propOr } from 'ramda'

import { CvViewCredentialTypes } from '../../../components/CvView'
import { selectUserChallenges } from '../../UserChallenges/UserChallenges.selector'
import { getCompletedChallengesMetadata } from './CompletedChallengesView.utils'

export default createSelector<any, any, { userChallenges: CvViewCredentialTypes.CvViewCredentialsData }>(
  selectUserChallenges,
  challenges => {
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
