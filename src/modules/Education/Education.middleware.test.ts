import { mergeRight } from 'ramda'
import { createMiddlewareMock } from 'tests/tests.utils'

import { actions as ApiActions } from '~/api'
import { constants as ApiQualificationsConstants } from '~/api/education'
import { UserCredentialTypes } from '~/api/users/users.types'
import { actions as UserQualificationActions } from '~/modules/UserEducation'

import * as SUT from './Education.middleware'
import { createEducation, createEducationFailure, createEducationSuccess } from './Education.reducer'

describe('modules/Education/Education.middleware', () => {
  describe('createQualificationFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const mockPayload = {
        title: 'TITLE',
        description: 'DESCRIPTION',
        organisationId: 'ORGANISATION_ID',
        startTime: '2021-08-02T13:24:27.839Z',
        endTime: '2021-09-02T13:02:27.839Z',
        countries: ['SOME COUNTRY'],
        skillNames: ['SKILL 1'],
        certificate: null,
        type: UserCredentialTypes.Education,
      }
      // when ... we create the user's credentials
      const action = createEducation(mockPayload)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.createQualificationFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiQualificationsConstants.EDUCATION_CREATE_CONFIG, {
            onSuccess: createEducationSuccess,
            onFailure: createEducationFailure,
          }),
          action.payload,
        ),
      )
    })
  })
  describe('createQualificationSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const mockedPayload = {
        data: {
          data: 'QUALIFICATION DATA',
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }
      // @ts-ignore
      const action = createEducationSuccess(mockedPayload)
      // @ts-ignore
      const { invoke, next } = create(SUT.createQualificationSuccessFlow)
      // when ... we respond to the createEducationSuccess action
      invoke(action)

      // then ...validate createQualificationSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle Qualification create success', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      const mockedPayload = {
        data: {
          data: 'QUALIFICATION DATA',
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      // @ts-ignore
      const action = createEducationSuccess(mockedPayload)
      // @ts-ignore
      const { store, invoke } = create(SUT.createQualificationSuccessFlow)
      // when ... we respond to the createEducationSuccess action
      invoke(action)

      // then ...validate createQualificationSuccessFlow
      expect(store.dispatch).toHaveBeenCalledWith(
        // @ts-ignore
        UserQualificationActions.createUserQualification('QUALIFICATION DATA'),
      )
    })
  })
  describe('createQualificationFailureFlow', () => {
    it('should correctly handle Qualification create failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = createEducationFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.createQualificationFailureFlow({ notification: mockNotification }))

      // when ... we respond to the createQualificationFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
