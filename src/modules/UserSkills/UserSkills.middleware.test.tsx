import { mergeRight } from 'ramda'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions, utils as ApiUtils } from '../../api'
import { constants as ApiUsersConstants } from '../../api/users'
import * as SUT from './UserSkills.middleware'
import { fetchUserSkills, fetchUserSkillsFailure, fetchUserSkillsSuccess, setUserSkills } from './UserSkills.reducer'

describe('modules/UserSkills/UserSkills.middleware', () => {
  describe('fetchUserSkillsFlow', () => {
    it('should correctly handle updating the skills state', () => {
      // given ...
      const create = createMiddlewareStub(jest, { user: { id: 'USER ID' } })
      const action = fetchUserSkills()
      const config = ApiUtils.prependIdToEndpointInConfig(ApiUsersConstants.USERS_SKILLS_GET_BY_ID_CONFIG)('USER ID')
      // @ts-ignore
      const { invoke, next, store } = create(SUT.fetchUserSkillsFlow)

      // when ...
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
      const create = createMiddlewareStub(jest)
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

      const action = fetchUserSkillsSuccess(mockResponseData)
      // @ts-ignore
      const { invoke, next, store } = create(SUT.fetchUserSkillsSuccessFlow)
      // when ... we respond to the createUserSkillSuccess action
      invoke(action)

      // then ...validate createUserSkillSuccessFlow
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
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()
      // @ts-ignore

      // when ... we respond to the createUserSkillFailure action
      const action = fetchUserSkillsFailure('FAILED')
      const { invoke, next } = create(SUT.fetchUserSkillsFailureFlow({ notification: mockNotification }))
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
  })
})
