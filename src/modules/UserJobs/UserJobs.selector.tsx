import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map, path, pathOr, pipe, prop, propOr } from 'ramda'
import { RootState } from 'redux/redux.types'

import { CvViewCredentialTypes } from '../../components/CvView'

export const selectUserJobs = (state: RootState) => state.userJobs
export const selectFormValues = createSelector(selectUserJobs, prop(['formValues']))

export const selectUserJobItems = createSelector<any, any, CvViewCredentialTypes.CvViewCredentialsData>(
  selectUserJobs,
  jobs => {
    // TODO: fix this to pass correct data (includes company, countries and period for job)
    const ids = jobs.ids
    const entities = map(
      pipe(
        applySpec({
          title: pathOr('', ['job', 'title']),
          subtitle: pathOr('', ['job', 'organisationName']),
          description: pathOr('', ['job', 'description']),
          iconUrl: path(['job', 'organisationLogoURL']),
          isValidated: propOr(false, 'approved'),
        }),
      ),
    )(jobs.entities)
    return { ids, entities }
  },
)
