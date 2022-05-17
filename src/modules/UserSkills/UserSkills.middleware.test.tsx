import { mergeRight } from 'ramda'

import { createMiddlewareMock } from '~/../tests/tests.utils'
import { actions as ApiActions, utils as ApiUtils } from '~/api'
import { constants as ApiUsersConstants } from '~/api/users'
import * as NavigationUtils from '~/modules/Navigation/Navigation.utils'
import { userInitialStateFixture } from '~/modules/User/User.fixture'

import * as SUT from './UserSkills.middleware'
import {
  addUserSkills,
  addUserSkillsFailure,
  addUserSkillsSuccess,
  fetchUserSkills,
  fetchUserSkillsFailure,
  fetchUserSkillsSuccess,
  setUserSkills,
  updateUserSkills,
} from './UserSkills.reducer'

describe('modules/UserSkills/UserSkills.middleware', () => {
  describe('fetchUserSkillsFlow', () => {
    it('should correctly handle updating the skills state', () => {
      // given ...
      const create = createMiddlewareMock(jest, { user: userInitialStateFixture({ id: 'USER ID' }) })
      const config = ApiUtils.prependValueToEndpointInConfig(ApiUsersConstants.USERS_SKILLS_GET_BY_ID_CONFIG)('USER ID')

      // when ...
      const action = fetchUserSkills()
      const { invoke, next, store } = create(SUT.fetchUserSkillsFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: fetchUserSkillsSuccess,
            onFailure: fetchUserSkillsFailure,
          }),
        ),
      )
      expect(next).toHaveBeenCalledWith(action)
    })
  })
  describe('fetchUserSkillsSuccessFlow', () => {
    it('should correctly add skills to state on successful fetch', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const mockResponseData = {
        data: {
          data: [
            {
              skillName: 'Skill',
              verifiedBy: {
                name: 'Name',
                logoUrl: 'Url',
              },
            },
          ],
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      // when ... we respond to the fetchUserSkillsSuccess action
      const action = fetchUserSkillsSuccess(mockResponseData)
      const { invoke, next, store } = create(SUT.fetchUserSkillsSuccessFlow)
      invoke(action)

      // then ...normalise the data and set it in state
      expect(store.dispatch).toHaveBeenCalledWith(
        setUserSkills({
          ids: ['Skill'],
          entities: {
            Skill: {
              skillName: 'Skill',
              verifiedBy: {
                name: 'Name',
                logoUrl: 'Url',
              },
            },
          },
        }),
      )
      expect(next).toHaveBeenCalledWith(action)
    })
  })
  describe('fetchUserSkillsFailureFlow', () => {
    it('should correctly handle user skills fetch failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const mockNotification = jest.fn()

      // when ... we respond to the fetchUserSkillsFailureFlow action
      const action = fetchUserSkillsFailure('FAILED')
      const { invoke, next } = create(SUT.fetchUserSkillsFailureFlow({ notification: mockNotification }))
      invoke(action)

      // then ...notify with a notification of failure
      expect(mockNotification).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
  })
  describe('addUserSkillsFlow', () => {
    it('should correctly handle adding user skills', () => {
      // given ...
      const create = createMiddlewareMock(jest, { user: userInitialStateFixture({ id: 'USER ID' }) })
      const action = addUserSkills(['SKILL 1', 'SKILL 2'])
      const config = ApiUtils.prependValueToEndpointInConfig(ApiUsersConstants.USERS_SKILLS_ADD_CONFIG)('USER ID')
      const { invoke, next, store } = create(SUT.addUserSkillsFlow)

      // when ...
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: addUserSkillsSuccess,
            onFailure: addUserSkillsFailure,
          }),
          ['SKILL 1', 'SKILL 2'],
        ),
      )
      expect(next).toHaveBeenCalledWith(action)
    })
  })
  describe('addUserSkillsSuccessFlow', () => {
    beforeEach(() => {
      jest.mock('~/modules/Navigation/Navigation.utils')
      jest.spyOn(NavigationUtils, 'navigate')
    })
    afterEach(() => {
      jest.clearAllMocks()
    })
    it('should correctly add skills to state on successful fetch', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const mockResponseData = {
        data: {
          data: { skills: ['Skill'] },
          meta: {
            success: true,
            code: 200,
            message: null,
          },
        },
        status: 201,
        statusText: undefined,
      }
      const notificationMock = jest.fn()

      // when ... we respond to the addUserSkillsSuccess action
      const action = addUserSkillsSuccess(mockResponseData)
      const { invoke, next, store } = create(SUT.addUserSkillsSuccessFlow({ notification: notificationMock }))
      invoke(action)

      // then ...normalise the data and set it in state
      expect(store.dispatch).toHaveBeenCalledWith(
        updateUserSkills({
          ids: ['Skill'],
          entities: {
            Skill: {
              skillName: 'Skill',
              verifiedBy: null,
            },
          },
        }),
      )
      expect(NavigationUtils.navigate).toHaveBeenCalled()
      expect(notificationMock).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
  })
  describe('addUserSkillsFailureFlow', () => {
    it('should correctly handle user skills fetch failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const mockNotification = jest.fn()

      // when ... we respond to the addUserSkillsFailure action
      const action = addUserSkillsFailure('FAILED')
      const { invoke, next } = create(SUT.addUserSkillsFailureFlow({ notification: mockNotification }))
      invoke(action)

      // then ...notify with a notification of failure
      expect(mockNotification).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
  })
})
