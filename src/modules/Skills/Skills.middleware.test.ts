import { mergeRight } from 'ramda'

import { actions as ApiActions } from '~/api'
import { constants as ApiSkillsConstants } from '~/api/skills'
import { rootStateFixture } from '~/redux/redux.fixture'
import { extractDataFromResponseAction } from '~/redux/redux.utils'

import { createMiddlewareMock } from '../../../tests/tests.utils'
import * as SUT from './Skills.middleware'
import {
  fetchSkills,
  fetchSkillsFailure,
  fetchSkillsSuccess,
  getSkillsSuccess,
  normaliseSkillsSuccess,
  setSkills,
} from './Skills.reducer'
import { SKILLS_MOCK } from './Skills.test.fixtures'

describe('modules/Skills/Skills.middleware', () => {
  describe('fetchSkillsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = fetchSkills()
      // @ts-ignore
      const { invoke, next } = create(SUT.fetchSkillsFlow)

      // when ... we respond to the fetchSkills action
      invoke(action)

      // then ...validate fetchSkillsFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle updating the skills state', () => {
      // given ...
      const mockState = rootStateFixture()

      const create = createMiddlewareMock(jest, mockState)
      const action = fetchSkills()
      // @ts-ignore
      const { invoke, store } = create(SUT.fetchSkillsFlow)
      // when ... we respond to the fetchSkills action
      invoke(action)

      // then ...validate fetchSkillsFlow
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiSkillsConstants.SKILLS_GET_KEY_NAMES_CONFIG, {
            onSuccess: fetchSkillsSuccess,
            onFailure: fetchSkillsFailure,
          }),
        ),
      )
    })
  })
  describe('fetchSkillsSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const mockResponseData = {
        data: {
          data: SKILLS_MOCK,
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = fetchSkillsSuccess(mockResponseData)
      // @ts-ignore
      const { invoke, next } = create(SUT.fetchSkillsSuccessFlow)
      // when ... we respond to the fetchSkillsSuccess action
      invoke(action)

      // then ...validate fetchSkillsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly add skills to state on successful fetch', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const mockResponseData = {
        data: {
          data: SKILLS_MOCK,
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = fetchSkillsSuccess(mockResponseData)
      // @ts-ignore
      const { store, invoke } = create(SUT.fetchSkillsSuccessFlow)
      // when ... we respond to the fetchSkillsSuccess action
      invoke(action)
      // then ...validate setSkills

      const data = extractDataFromResponseAction(action)
      expect(store.dispatch).toHaveBeenCalledWith(getSkillsSuccess(data))
    })
  })
  describe('normaliseSkillsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const skillCredentialsMock = [{ id1: 'skill1' }, { id2: 'skill2' }]
      const normalisedChallengesMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'skill 1', id2: 'skill 2' },
      }
      const normaliseMock = jest.fn(() => normalisedChallengesMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getSkillsSuccess(skillCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store, next } = create(SUT.normaliseSkillsFlow({ normalise: normaliseMock }))
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should normalise and forward the skill credentials', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const skillCredentialsMock = [{ id1: 'skill1' }, { id2: 'skill2' }]
      const normalisedChallengesMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'skill 1', id2: 'skill 2' },
      }
      const normaliseMock = jest.fn(() => normalisedChallengesMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getSkillsSuccess(skillCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store } = create(SUT.normaliseSkillsFlow({ normalise: normaliseMock }))
      invoke(action)

      // then ...
      // @ts-ignore - data shape doesn't matter for test
      expect(store.dispatch).toHaveBeenCalledWith(normaliseSkillsSuccess(normalisedChallengesMock))
    })
  })
  describe('setSkillsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      const normalisedChallengesMock = 'NORMALISED SKILLS DATA'
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseSkillsSuccess(normalisedChallengesMock)

      // when ...
      const { invoke, store, next } = create(SUT.setSkillsFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should set the normalised skill data', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseSkillsSuccess('NORMALISED SKILLS DATA')

      // when ... we have skills data to store in state
      const { invoke, store } = create(SUT.setSkillsFlow)
      invoke(action)

      // then ...we want to forward it with our reducer action
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      expect(store.dispatch).toHaveBeenCalledWith(setSkills('NORMALISED SKILLS DATA'))
    })
  })
  describe('fetchSkillsFailureFlow', () => {
    it('should correctly handle skills fetch failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = fetchSkillsFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.fetchSkillsFailureFlow({ notification: mockNotification }))

      // when ... we respond to the fetchSkillsFailure action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
