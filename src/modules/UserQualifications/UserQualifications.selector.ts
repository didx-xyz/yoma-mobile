import { createSelector } from '@reduxjs/toolkit'
import { applySpec, complement, equals, filter, map, not, path, pathOr, pick, pipe, prop, propOr, when } from 'ramda'

import { getCompletedCoursesMetadata } from '~/modules/CompletedCourses/View/CompletedCoursesView.utils'
import { RootState } from '~/redux/redux.types'
import * as ReduxUtils from '~/redux/redux.utils'

import { NormalisedUserQualifications } from './UserQualifications.types'

export const selectUserQualifications = (state: RootState) => state.userQualifications
export const selectUserQualificationCredentials = createSelector<any, NormalisedUserQualifications>(
  selectUserQualifications,
  pick(['ids', 'entities']),
)
export const selectUserQualificationCredentialsType = (isEducation: boolean) =>
  createSelector(
    selectUserQualifications,
    pipe(
      prop('entities'),
      filter(pipe(pathOr(false, ['qualification', 'createdByAdmin']), when(complement(equals(isEducation)), not))),
      ReduxUtils.normalise,
    ),
  )

export const selectUserQualificationCredentialsWidget = (selector: any) =>
  createSelector(selector, (userQualifications: NormalisedUserQualifications) => {
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
  })

export const selectUserQualificationCredentialsView = (selector: any) =>
  createSelector(selector, (userQualifications: NormalisedUserQualifications) => {
    const ids = userQualifications.ids
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
    )(userQualifications.entities)
    return { userQualifications: { ids, entities } }
  })

export const selectFormValues = createSelector(selectUserQualifications, prop(['formValues']))
export const selectFormCertificate = createSelector(selectFormValues, prop('certificate'))
