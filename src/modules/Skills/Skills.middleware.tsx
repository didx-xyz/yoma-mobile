import { mergeRight } from 'ramda'
import { Middleware } from 'redux'
import { Normalise } from 'types/redux.types'
import { showSimpleMessage } from 'utils/error'
import { extractDataFromPayload, extractEntitiesFromPayload } from 'utils/redux.utils'

import { actions as ApiActions } from '../../api'
import { constants as ApiSkillsConstants } from '../../api/skills'
import {
  fetchSkills,
  fetchSkillsFailure,
  fetchSkillsSuccess,
  filterSkillsByValue,
  getSkillsSuccess,
  normaliseSkillsSuccess,
  setFilteredSkills,
  setSkills,
} from './Skills.reducer'
import { selectEntities } from './Skills.selector'
import { NormalisedSkills, Skill } from './Skills.types'
import { extractFilteredSkillsByValue } from './Skills.utils'

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
      const normalisedEntities = extractEntitiesFromPayload(action)
      const filteredSkills = extractFilteredSkillsByValue('', normalisedEntities)
      dispatch(setFilteredSkills(filteredSkills))
      dispatch(setSkills(action.payload))
    }
    return result
  }

export const filterSkillsByValueFlow: Middleware =
  ({ getState, dispatch }) =>
  next =>
  action => {
    const result = next(action)
    if (filterSkillsByValue.match(action)) {
      const state = getState()
      const normalisedEntities = selectEntities(state)
      const filteredSkills = extractFilteredSkillsByValue(action.payload, normalisedEntities)
      dispatch(setFilteredSkills(filteredSkills))
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
