import { createSelector } from '@reduxjs/toolkit'
import { applySpec, filter, map, path, pathOr, pick, pipe, prop, propOr, values } from 'ramda'

import { RootState } from '~/redux/redux.types'
import * as ReduxUtils from '~/redux/redux.utils'

import { NormalisedUserQualifications, UserQualificationsViewCredentials } from './UserQualifications.types'
import { filterEducationOrCourse, getUserQualificationsMetadata } from './UserQualifications.utils'

export const selectUserQualifications = (state: RootState) => state.userQualifications
export const selectUserQualificationCredentials = createSelector<any, NormalisedUserQualifications>(
  selectUserQualifications,
  pick(['ids', 'entities']),
)

export const selectUserQualificationCredentialsType = (isCourse: boolean) =>
  createSelector(
    selectUserQualifications,
    pipe(prop('entities'), filter(filterEducationOrCourse(isCourse)), values, ReduxUtils.normalise),
  )

export const selectUserQualificationCredentialsWidget = (selector: any) =>
  createSelector<any, UserQualificationsViewCredentials>(
    selector,
    (userQualifications: NormalisedUserQualifications) => {
      const count = userQualifications.ids.length
      const ids = userQualifications.ids
      const entities = map(
        applySpec({
          name: pathOr('', ['qualification', 'title']),
          startDate: propOr('', 'startDate'),
          organisationLogoURL: path(['qualification', 'organisationLogoURL']),
          isValidated: propOr(false, 'approved'),
        }),
      )(userQualifications.entities)

      return { userQualifications: { ids, entities }, count }
    },
  )

export const selectUserQualificationCredentialsView = (selector: any) =>
  createSelector<any, UserQualificationsViewCredentials>(
    selector,
    (userQualifications: NormalisedUserQualifications) => {
      const ids = userQualifications.ids
      const entities = map(
        pipe(
          applySpec({
            title: pathOr('', ['qualification', 'title']),
            metadata: getUserQualificationsMetadata,
            description: pathOr('', ['qualification', 'description']),
            iconUrl: path(['qualification', 'organisationLogoURL']),
            isValidated: propOr(false, 'approved'),
            createdByAdmin: pathOr(false, ['qualification', 'createdByAdmin']),
          }),
        ),
      )(userQualifications.entities)
      return { userQualifications: { ids, entities } }
    },
  )

export const selectFormValues = createSelector(selectUserQualifications, prop(['formValues']))
export const selectFormCertificate = createSelector(selectFormValues, prop('certificate'))
