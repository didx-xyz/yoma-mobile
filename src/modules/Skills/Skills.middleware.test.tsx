import { addParamsToConfig } from 'api/api.utils'
import { mergeRight } from 'ramda'
import { rootStateFixture } from 'redux/redux.test.fixtures'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiSkillsConstants } from '../../api/skills'
import * as SUT from './Skills.middleware'
import { fetchSkillsByName, fetchSkillsFailure, fetchSkillsSuccess, setSkills } from './Skills.reducer'
import { extractSkillsFromPayload } from './Skills.utils'

describe('modules/Skills/Skills.middleware', () => {
  describe('fetchSkillsByNameFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const mockState = rootStateFixture({})

      const create = createMiddlewareStub(jest, mockState)
      const action = fetchSkillsByName('QUERY')
      // @ts-ignore
      const { invoke, next } = create(SUT.fetchSkillsByNameFlow)

      // when ... we respond to the fetchSkillsByName action
      invoke(action)

      // then ...validate fetchSkillsFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle updating the skills state', () => {
      // given ...
      const mockState = rootStateFixture({})

      const create = createMiddlewareStub(jest, mockState)
      const action = fetchSkillsByName('QUERY')
      // @ts-ignore
      const { invoke, store } = create(SUT.fetchSkillsByNameFlow)
      // when ... we respond to the updateSkills action
      invoke(action)

      // then ...validate fetchSkillsByNameFlow
      const config = addParamsToConfig(ApiSkillsConstants.SKILLS_GET_BY_NAME_CONFIG)({ q: action.payload })

      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
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
