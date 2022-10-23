import { createSelector } from '@reduxjs/toolkit'
import { applySpec, filter, map, mergeRight, pathOr, pick, pipe, prop, values } from 'ramda'

import { constants as UserConstants } from '~/modules/User'
import { RootState } from '~/redux/redux.types'
import * as ReduxUtils from '~/redux/redux.utils'

import {
  NormalisedUserEducation,
  UserEducationViewCredentials,
  UserEducationWidgetSelector,
} from './UserEducation.types'
import { filterEducationOrCourse, getUserEducationMetadata } from './UserEducation.utils'

export const selectUserEducation = (state: RootState) => state.userEducation
export const selectUserEducationCredentials = createSelector<any, NormalisedUserEducation>(
  selectUserEducation,
  pick(['ids', 'entities']),
)

export const selectUserEducationCredentialsType = (isCourse: boolean) =>
  createSelector(
    selectUserEducation,
    pipe(prop('entities'), filter(filterEducationOrCourse(isCourse)), values, ReduxUtils.normalise),
  )

export const selectUserEducationCredentialsWidget = (selector: any) =>
  createSelector<any, UserEducationWidgetSelector>(selector, (UserEducation: NormalisedUserEducation) => {
    const count = UserEducation.ids.length
    const ids = UserEducation.ids
    const entities = map(applySpec(UserConstants.USER_OPPORTUNITY_CREDENTIAL_WIDGET_SELECTOR_SPEC))(
      UserEducation.entities,
    )

    return { UserEducation: { ids, entities }, count }
  })

const USER_QUALIFICATION_VIEW_SELECTOR_SPEC = mergeRight(UserConstants.USER_OPPORTUNITY_CREDENTIAL_VIEW_SELECTOR_SPEC, {
  metadata: getUserEducationMetadata,
  createdByAdmin: pathOr(false, ['opportunity', 'createdByAdmin']),
})

export const selectUserEducationCredentialsView = (selector: any) =>
  createSelector<any, UserEducationViewCredentials>(selector, (UserEducation: NormalisedUserEducation) => {
    const ids = UserEducation.ids
    const entities = map(applySpec(USER_QUALIFICATION_VIEW_SELECTOR_SPEC))(UserEducation.entities)
    return { UserEducation: { ids, entities } }
  })

export const selectFormValues = createSelector(selectUserEducation, prop(['formValues']))
export const selectFormCertificate = createSelector(selectFormValues, prop('certificate'))
