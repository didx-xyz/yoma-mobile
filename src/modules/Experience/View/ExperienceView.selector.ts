import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, pipe, propOr } from 'ramda'

import { CvViewCredentialTypes } from '../../../components/CvView'
import { selectUserJobs } from '../../UserJobs/UserJobs.selector'
import { getExperienceMetadata } from './ExperienceView.utils'

export default createSelector<any, any, { userJobs: CvViewCredentialTypes.CvViewCredentialsData }>(
  selectUserJobs,
  jobs => {
    const ids = jobs.ids
    const entities = map(
      pipe(
        applySpec({
          title: pathOr('', ['job', 'title']),
          metadata: getExperienceMetadata,
          description: pathOr('', ['job', 'description']),
          iconUrl: path(['job', 'organisationLogoURL']),
          isValidated: propOr(false, 'approved'),
        }),
      ),
    )(jobs.entities)
    return { userJobs: { ids, entities } }
  },
)
