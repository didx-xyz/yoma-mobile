import { addParamsToConfig } from 'api/api.utils'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'

import { actions as ApiActions } from '../../api'
import { constants as ApiSkillsConstants } from '../../api/skills'
import { fetchSkillsByName, fetchSkillsFailure, fetchSkillsSuccess, setSkills } from './Skills.reducer'
import { extractSkillsFromPayload } from './Skills.utils'

export const fetchSkillsByNameFlow: Middleware =
  ({ dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (fetchSkillsByName.match(action)) {
      const config = addParamsToConfig(ApiSkillsConstants.SKILLS_GET_BY_NAME_CONFIG)({ q: action.payload })
      dispatch(
        ApiActions.apiRequest(
          mergeRight(config, {
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
      const skillsPayload = extractSkillsFromPayload(action)
      dispatch(setSkills(skillsPayload))
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
