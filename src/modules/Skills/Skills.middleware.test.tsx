import { mergeRight } from 'ramda'
import { rootStateFixture } from 'redux/redux.test.fixtures'
import { extractDataFromPayload } from 'utils/redux.utils'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiSkillsConstants } from '../../api/skills'
import * as SUT from './Skills.middleware'
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
import { SKILLS_MOCK } from './Skills.test.fixtures'

describe('modules/Skills/Skills.middleware', () => {
  describe('fetchSkillsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
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

      const create = createMiddlewareStub(jest, mockState)
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
      const create = createMiddlewareStub(jest)
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
      const create = createMiddlewareStub(jest)
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

      const data = extractDataFromPayload(action)
      expect(store.dispatch).toHaveBeenCalledWith(getSkillsSuccess(data))
    })
  })
  describe('normaliseSkillsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
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
      const { invoke, store, next } = create(SUT.normaliseSkillsFlow(normaliseMock))
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should normalise and forward the skill credentials', () => {
      // given ...
      const create = createMiddlewareStub(jest)
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
      const { invoke, store } = create(SUT.normaliseSkillsFlow(normaliseMock))
      invoke(action)

      // then ...
      // @ts-ignore - data shape doesn't matter for test
      expect(store.dispatch).toHaveBeenCalledWith(normaliseSkillsSuccess(normalisedChallengesMock))
    })
  })
  describe('setSkillsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)

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
      const create = createMiddlewareStub(jest)

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
  describe('filterSkillsByValueFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const mockState = rootStateFixture()

      const create = createMiddlewareStub(jest, mockState)
      const action = filterSkillsByValue('')
      // @ts-ignore
      const { invoke, next } = create(SUT.filterSkillsByValueFlow)

      // when ... we respond to the filterSkillsByValue action
      invoke(action)

      // then ...validate fetchSkillsFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly set filtered skills to state', () => {
      // given ...
      const mockState = rootStateFixture({
        skills: {
          ids: ['key1', 'key2'],
          entities: {
            key1: {
              key: 'key1',
              value: 'value1',
            },
            key2: {
              key: 'key2',
              value: 'value2',
            },
          },
        },
      })

      const create = createMiddlewareStub(jest, mockState)
      const action = filterSkillsByValue('value1')
      // @ts-ignore
      const { invoke, store } = create(SUT.filterSkillsByValueFlow)
      // when ... we respond to the updateSkills action
      invoke(action)

      // then ...validate filterSkillsByValueFlow
      expect(store.dispatch).toHaveBeenCalledWith(
        setFilteredSkills([
          {
            key: 'key1',
            value: 'value1',
          },
        ]),
      )
    })
  })
  describe('fetchSkillsFailureFlow', () => {
    it('should correctly handle skills fetch failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
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
