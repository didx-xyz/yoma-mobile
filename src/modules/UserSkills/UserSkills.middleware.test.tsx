import { mergeRight } from 'ramda'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiSkillsConstants } from '../../api/skills'
import * as SUT from './UserSkills.middleware'
import { createUserSkill, createUserSkillFailure, createUserSkillSuccess, setUserSkills } from './UserSkills.reducer'
import { USER_SKILLS_MOCK } from './UserSkills.test.fixtures'

describe('modules/UserSkills/UserSkills.middleware', () => {
  describe('createUserSkillFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const userId = 'A USER ID'
      const create = createMiddlewareStub(jest, { user: { id: userId } })
      const action = createUserSkill(['skill'])
      // @ts-ignore
      const { invoke, next } = create(SUT.createUserSkillFlow)

      // when ... we respond to the createUserSkill action
      invoke(action)

      // then ...validate createUserSkillFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle updating the skills state', () => {
      // given ...
      const userId = 'A USER ID'
      const create = createMiddlewareStub(jest, { user: { id: userId } })
      const action = createUserSkill(['skill'])
      // @ts-ignore
      const { invoke, store } = create(SUT.createUserSkillFlow)
      // when ... we respond to the createUserSkill action
      invoke(action)

      // then ...validate createUserSkillFlow
      const config = ApiUtils.prependIdToEndpointInConfig(ApiSkillsConstants.SKILLS_CREATE_CONFIG)(userId)

      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserSkillSuccess,
            onFailure: createUserSkillFailure,
          }),
          action.payload,
        ),
      )
    })
  })
  describe('createUserSkillSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()
      const mockResponseData = {
        data: {
          data: USER_SKILLS_MOCK,
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = createUserSkillSuccess(mockResponseData)
      // @ts-ignore
      const { invoke, next } = create(SUT.createUserSkillSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the createUserSkillSuccess action
      invoke(action)

      // then ...validate createUserSkillSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly add skills to state on successful fetch', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()
      const mockResponseData = {
        data: {
          data: USER_SKILLS_MOCK,
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = createUserSkillSuccess(mockResponseData)
      // @ts-ignore
      const { store, invoke } = create(SUT.createUserSkillSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the createUserSkillSuccess action
      invoke(action)
      // then ...validate setSkills

      expect(store.dispatch).toHaveBeenCalledWith(setUserSkills(USER_SKILLS_MOCK))
    })
  })
  describe('createUserSkillFailureFlow', () => {
    it('should correctly handle skills fetch failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = createUserSkillFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.createUserSkillFailureFlow({ notification: mockNotification }))

      // when ... we respond to the createUserSkillFailure action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
