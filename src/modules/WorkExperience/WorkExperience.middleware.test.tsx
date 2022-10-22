import { mergeRight } from 'ramda'
import { createMiddlewareMock } from 'tests/tests.utils'

import { actions as ApiActions } from '~/api'
import { constants as ApiJobsConstants } from '~/api/workExperience'

import { createUserWorkExperience } from '../UserWorkExperience/UserWorkExperience.reducer'
import * as SUT from './WorkExperience.middleware'
import {
  createWorkExperience,
  createWorkExperienceFailure,
  createWorkExperienceSuccess,
} from './WorkExperience.reducer'
import { WORK_EXPERIENCE_MOCK } from './WorkExperience.test.fixtures'

describe('modules/WorkExperience/WorkExperience.middleware', () => {
  describe('createWorkExperienceFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const mockPayload = {
        title: 'TITLE',
        description: 'DESCRIPTION',
        organisationId: 'ORGANISATION_ID',
        language: 'EN',
        published: true,
        skillNames: ['SKILL 1'],
        countries: ['COUNTRY 1'],
        startTime: '2021-08-02T13:24:27.839Z',
        endTime: '2021-09-02T13:02:27.839Z',
      }
      // when ... we create the user's credentials
      const action = createWorkExperience(mockPayload)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.createWorkExperienceFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiJobsConstants.WORK_EXPERIENCE_CREATE_CONFIG, {
            onSuccess: createWorkExperienceSuccess,
            onFailure: createWorkExperienceFailure,
          }),
          action.payload,
        ),
      )
    })
  })
  describe('createWorkExperienceSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const mockedPayload = {
        data: {
          data: WORK_EXPERIENCE_MOCK,
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }
      const action = createWorkExperienceSuccess(mockedPayload)
      // @ts-ignore
      const { invoke, next } = create(SUT.createWorkExperienceSuccessFlow)
      // when ... we respond to the createWorkExperienceSuccess action
      invoke(action)

      // then ...validate createWorkExperienceSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle work experience create success', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      const mockedPayload = {
        data: {
          data: WORK_EXPERIENCE_MOCK,
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = createWorkExperienceSuccess(mockedPayload)
      // @ts-ignore
      const { store, invoke } = create(SUT.createWorkExperienceSuccessFlow)
      // when ... we respond to the createWorkExperienceSuccess action
      invoke(action)

      // then ...validate createWorkExperienceSuccessFlow
      expect(store.dispatch).toHaveBeenCalledWith(createUserWorkExperience(WORK_EXPERIENCE_MOCK))
    })
  })
  describe('createWorkExperienceFailure', () => {
    it('should correctly handle job create failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = createWorkExperienceFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.createWorkExperienceFailureFlow({ notification: mockNotification }))

      // when ... we respond to the createWorkExperienceFailure action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
