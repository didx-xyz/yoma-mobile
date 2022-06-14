import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, pipe, propOr } from 'ramda'

import { types as CvViewCredentialTypes } from '~/components/CvViewCredential'
import { selectUserQualifications } from '~/modules/UserQualifications/UserQualifications.selector'
import { NormalisedUserQualifications } from '~/modules/UserQualifications/UserQualifications.types'

import { getCompletedCoursesMetadata } from './CompletedCoursesView.utils'

export default createSelector<any, { userQualifications: CvViewCredentialTypes.CvViewCredentialsData }>(
  selectUserQualifications,
  (qualifications: NormalisedUserQualifications) => {
    const ids = qualifications.ids
    const entities = map(
      pipe(
        applySpec({
          title: pathOr('', ['qualification', 'title']),
          metadata: getCompletedCoursesMetadata,
          description: pathOr('', ['qualification', 'description']),
          iconUrl: path(['qualification', 'organisationLogoURL']),
          isValidated: propOr(false, 'approved'),
          createdByAdmin: pathOr(false, ['qualification', 'createdByAdmin']),
        }),
      ),
    )(qualifications.entities)
    return { userQualifications: { ids, entities } }
  },
)
