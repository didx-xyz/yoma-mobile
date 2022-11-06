import { createSelector } from '@reduxjs/toolkit'
import { applySpec, map } from 'ramda'

import { selectors as UserEducationSelectors } from '~/modules/UserEducation'
import type * as UserEducationTypes from '~/modules/UserEducation/types'

import { USER_EDUCATION_VIEW_SELECTOR_SPEC } from './EducationView.constants'

export default createSelector<any, UserEducationTypes.UserEducationViewCredentials>(
  UserEducationSelectors.selectUserEducationCredentials,
  (userEducation: UserEducationTypes.NormalisedUserEducation) => {
    const ids = userEducation.ids
    const entities = map(applySpec(USER_EDUCATION_VIEW_SELECTOR_SPEC))(userEducation.entities)
    return { userEducation: { ids, entities } }
  },
)
