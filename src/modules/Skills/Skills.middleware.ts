import i18n from 'i18next'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'

import { actions as ApiActions } from '~/api'
import { constants as ApiSkillsConstants } from '~/api/skills'
import * as Strings from '~/constants/strings.constants'
import * as ReduxTypes from '~/redux/redux.types'
import { extractDataFromResponseAction } from '~/redux/redux.utils'
import { showSimpleMessage } from '~/utils/error'

import {
  fetchSkills,
  fetchSkillsFailure,
  fetchSkillsSuccess,
  getSkillsSuccess,
  normaliseSkillsSuccess,
  setSkills,
} from './Skills.reducer'
import { Skill } from './Skills.types'

export const fetchSkillsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchSkills.match(action)) {
      dispatch(
        ApiActions.apiRequest(
          mergeRight(ApiSkillsConstants.SKILLS_GET_KEY_NAMES_CONFIG, {
            onSuccess: fetchSkillsSuccess,
            onFailure: fetchSkillsFailure,
          }),
        ),
      )
    }
    return result
  }

export const fetchSkillsSuccessFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)

    if (fetchSkillsSuccess.match(action)) {
      const data = extractDataFromResponseAction(action)
      dispatch(getSkillsSuccess(data))
    }
    return result
  }

export const normaliseSkillsFlow =
  ({ normalise }: ReduxTypes.NormaliseDependency<Skill>): Middleware =>
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (getSkillsSuccess.match(action)) {
      const normalisedSkills = normalise(action.payload, 'key')
      dispatch(normaliseSkillsSuccess(normalisedSkills))
    }
    return result
  }

export const setSkillsFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (normaliseSkillsSuccess.match(action)) {
      dispatch(setSkills(action.payload))
    }
    return result
  }

export const fetchSkillsFailureFlow =
  ({ notification }: { notification: typeof showSimpleMessage }): Middleware =>
  _store =>
  next =>
  action => {
    const result = next(action)

    if (fetchSkillsFailure.match(action)) {
      // TODO: this should be handled by the notification module
      notification(
        'danger',
        i18n.t('general.errorOccurred'),
        i18n.t(Strings.OOPS_SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN),
      )
    }
    return result
  }
