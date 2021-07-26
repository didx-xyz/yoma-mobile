import { mergeRight } from 'ramda'
import { rootStateFixture } from 'redux/redux.test.fixtures'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiSkillsConstants } from '../../api/skills'
import * as SUT from './Skills.middleware'
import { fetchSkills, fetchSkillsFailure, fetchSkillsSuccess, setSkills } from './Skills.reducer'
import { extractSkillsFromPayload } from './Skills.utils'

describe('modules/Skills/Skills.middleware', () => {
  describe('fetchSkillsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const mockState = rootStateFixture({})

      const create = createMiddlewareStub(jest, mockState)
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
      const mockState = rootStateFixture({})

      const create = createMiddlewareStub(jest, mockState)
      const action = fetchSkills()
      // @ts-ignore
      const { invoke, store } = create(SUT.fetchSkillsFlow)
      // when ... we respond to the updateSkills action
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
      const mockResponseData = [
        {
          key: 'SOME_KEY',
          value: 'SOME_VALUE',
        },
      ]

      const action = fetchSkillsSuccess(mockResponseData)
      // @ts-ignore
      const { invoke, next } = create(SUT.fetchSkillsSuccessFlow)
      // when ... we respond to the fetchSkillsSuccess action
      invoke(action)
      // then ...validate fetchSkillsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly set skills data on successful fetch', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockResponseData = {
        data: [
          {
            key: 'SOME_KEY',
            value: 'SOME_VALUE',
          },
        ],
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = fetchSkillsSuccess(mockResponseData)
      // @ts-ignore
      const { store, invoke } = create(SUT.fetchSkillsSuccessFlow)
      // when ... we respond to the updateSkillsSuccess action
      invoke(action)
      // then ...validate setSkills
      const skills = extractSkillsFromPayload(action)
      expect(store.dispatch).toHaveBeenCalledWith(setSkills(skills))
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
