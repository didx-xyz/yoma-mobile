import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { showSimpleMessage } from 'utils/error'
import { filterByQuery, sliceAt } from 'utils/strings.utils'

import { actions as ApiActions } from '../../api'
import { constants as ApiSkillsConstants } from '../../api/skills'
import {
  fetchSkills,
  fetchSkillsFailure,
  fetchSkillsSuccess,
  filterSkillsByName,
  setFilteredSkills,
  setSkillEntities,
} from './Skills.reducer'
import { selectSkillEntities } from './Skills.selector'
import { extractSkillsFromPayload } from './Skills.utils'

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

export const filterSkillsByNameFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (filterSkillsByName.match(action)) {
      const state = getState()
      const skillEntities = selectSkillEntities(state) as []
      const filtered = filterByQuery(action.payload, skillEntities)
      dispatch(setFilteredSkills(filtered))
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
      const truncatedSkills = sliceAt(20, skillsPayload)
      dispatch(setSkillEntities(skillsPayload))
      dispatch(setFilteredSkills(truncatedSkills))
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
