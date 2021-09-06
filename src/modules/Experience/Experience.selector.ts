import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, pipe, propOr } from 'ramda'

import { CvViewCredentialTypes } from '../../components/CvView'
import * as OrganisationsSelectors from '../Organisations/Organisations.selector'
import * as SkillsSelectors from '../Skills/Skills.selector'
import { selectUserJobs } from '../UserJobs/UserJobs.selector'
import { getExperienceMetadata } from './Experience.utils'

export const selectUserJobItems = createSelector<any, any, CvViewCredentialTypes.CvViewCredentialsData>(
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
    return { ids, entities }
  },
)

export default createSelector(
  selectUserJobItems,
  OrganisationsSelectors.selectOrganisationsList,
  SkillsSelectors.selectFiltered,
  (userJobs, organisations, skills) => ({
    userJobs,
    organisations,
    skills,
  }),
)
