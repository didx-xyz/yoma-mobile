import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, pipe, propOr } from 'ramda'

import { CvViewCredentialTypes } from '../../../components/CvView'
import { selectUserQualifications } from '../../UserQualifications/UserQualifications.selector'
import { getEducationMetadata } from './EducationView.utils'

export default createSelector<any, any, { userQualifications: CvViewCredentialTypes.CvViewCredentialsData }>(
  selectUserQualifications,
  qualifications => {
    const ids = qualifications.ids
    const entities = map(
      pipe(
        applySpec({
          title: pathOr('', ['qualification', 'title']),
          metadata: getEducationMetadata,
          description: pathOr('', ['qualification', 'description']),
          iconUrl: path(['qualification', 'organisationLogoURL']),
          isValidated: propOr(false, 'approved'),
        }),
      ),
    )(qualifications.entities)
    return { userQualifications: { ids, entities } }
  },
)
