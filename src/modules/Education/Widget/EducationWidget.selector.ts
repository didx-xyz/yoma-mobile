import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, pick, pipe, propOr, slice } from 'ramda'

import { NormalisedCvWidgetCredentialItems } from '~/components/CvWidgetCredential/CvWidgetCredential.types'
import { selectUserQualificationCredentials } from '~/modules/UserQualifications/UserQualifications.selector'
import { NormalisedUserQualifications } from '~/modules/UserQualifications/UserQualifications.types'

export default createSelector<any, { userQualifications: NormalisedCvWidgetCredentialItems; count: number }>(
  selectUserQualificationCredentials,
  (userQualifications: NormalisedUserQualifications) => {
    const count = userQualifications.ids.length
    const ids = slice(0, 2, userQualifications.ids)
    const entities = pipe(
      pick(ids),
      map(
        applySpec({
          name: pathOr('', ['qualification', 'title']),
          startDate: propOr('', 'startDate'),
          organisationLogoURL: path(['qualification', 'organisationLogoURL']),
          isValidated: propOr(false, 'approved'),
        }),
      ),
    )(userQualifications.entities)

    return { userQualifications: { ids, entities }, count }
  },
)
