import { fetchSkills, fetchSkillsFailure, fetchSkillsSuccess, setSkills } from 'modules/Skills/Skills.reducer'
import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'

import { actions as ApiActions } from '../../api'
import { constants as ApiSkillsConstants } from '../../api/skills'

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
          action.payload,
        ),
      )
    }
    return result
  }

export const fetchSkillsSuccessFlow: Middleware = _store => next => action => {
  const result = next(action)

  if (fetchSkillsSuccess.match(action)) {
    setSkills(action.payload)
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
