import { createSelector } from '@reduxjs/toolkit'
import { applySpec, filter, map, mergeRight, pathOr, pick, pipe, prop, values } from 'ramda'

import { RootState } from '~/redux/redux.types'
import * as ReduxUtils from '~/redux/redux.utils'

import { constants as UserConstants } from '../User'
import {
  NormalisedUserQualifications,
  UserQualificationsViewCredentials,
  UserQualificationsWidgetSelector,
} from './UserQualifications.types'
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
  createSelector<any, UserQualificationsWidgetSelector>(
    selector,
    (userQualifications: NormalisedUserQualifications) => {
      const count = userQualifications.ids.length
      const ids = userQualifications.ids
      const entities = map(applySpec(UserConstants.USER_OPPORTUNITY_CREDENTIAL_WIDGET_SELECTOR_SPEC))(
        userQualifications.entities,
      )

      return { userQualifications: { ids, entities }, count }
    },
  )

const USER_QUALIFICATION_VIEW_SELECTOR_SPEC = mergeRight(UserConstants.USER_OPPORTUNITY_CREDENTIAL_VIEW_SELECTOR_SPEC, {
  metadata: getUserQualificationsMetadata,
  createdByAdmin: pathOr(false, ['opportunity', 'createdByAdmin']),
})

export const selectUserQualificationCredentialsView = (selector: any) =>
  createSelector<any, UserQualificationsViewCredentials>(
    selector,
    (userQualifications: NormalisedUserQualifications) => {
      const ids = userQualifications.ids
      const entities = map(applySpec(USER_QUALIFICATION_VIEW_SELECTOR_SPEC))(userQualifications.entities)
      return { userQualifications: { ids, entities } }
    },
  )

export const selectFormValues = createSelector(selectUserQualifications, prop(['formValues']))
export const selectFormCertificate = createSelector(selectFormValues, prop('certificate'))
