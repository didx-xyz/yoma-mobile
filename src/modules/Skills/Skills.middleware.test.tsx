import { mergeRight } from 'ramda'
import { rootStateFixture } from 'redux/redux.test.fixtures'
import { searchArrayOfObjByValue } from 'utils/strings.utils'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiSkillsConstants } from '../../api/skills'
import * as SUT from './Skills.middleware'
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
      const mockState = rootStateFixture({})

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
  describe('filterSkillsByNameFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const mockState = rootStateFixture()

      const create = createMiddlewareStub(jest, mockState)
      const action = filterSkillsByName('QUERY')
      // @ts-ignore
      const { invoke, next } = create(SUT.filterSkillsByNameFlow)

      // when ... we respond to the filterSkillsByName action
      invoke(action)

      // then ...validate fetchSkillsFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle updating the skills state', () => {
      // given ...
      const mockState = rootStateFixture({
        skills: {
          filtered: [],
          skillEntities: [{ key: 'KEY', value: 'VALUE' }],
        },
      })

      const create = createMiddlewareStub(jest, mockState)
      const action = filterSkillsByName('QUERY')
      // @ts-ignore
      const { invoke, store } = create(SUT.filterSkillsByNameFlow)
      // when ... we respond to the filterSkillsByName action
      invoke(action)

      // then ...validate filterSkillsByNameFlow
      const state = store.getState()
      const skillEntities = selectSkillEntities(state) as []
      const filtered = searchArrayOfObjByValue(action.payload, skillEntities)
      expect(store.dispatch).toHaveBeenCalledWith(setFilteredSkills(filtered))
    })
  })
  describe('fetchSkillsSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockResponseData = {
        data: {
          data: [
            {
              key: 'SOME_KEY',
              value: 'SOME_VALUE',
            },
          ],
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
    it('should correctly set skills data on successful fetch', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockResponseData = {
        data: {
          data: [
            {
              key: 'SOME_KEY',
              value: 'SOME_VALUE',
            },
            {
              key: 'SOME_KEY1',
              value: 'SOME_VALUE1',
            },
          ],
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
      // then ...validate setSkillEntities
      const skills = extractSkillsFromPayload(action)
      expect(store.dispatch).toHaveBeenCalledWith(setSkillEntities(skills))
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
