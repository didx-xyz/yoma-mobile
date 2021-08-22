import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { Normalise } from 'types/general.types'
import { showSimpleMessage } from 'utils/error'
import { extractDataFromPayload } from 'utils/redux.utils'

import { actions as ApiActions } from '../../api'
import { constants as ApiSkillsConstants } from '../../api/skills'
import {
  fetchSkills,
  fetchSkillsFailure,
  fetchSkillsSuccess,
  getSkillsSuccess,
  normaliseSkillsSuccess,
  setSkills,
} from './Skills.reducer'
import { NormalisedSkills, Skill } from './Skills.types'

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
      const data = extractDataFromPayload(action)
      dispatch(getSkillsSuccess(data))
    }
    return result
  }

export const normaliseSkillsFlow =
  (normalise: Normalise<Skill, NormalisedSkills>): Middleware =>
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
      notification('danger', 'An error occurred.', 'Oops something went wrong! Please try again.')
    }
    return result
  }
