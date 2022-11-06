import { mergeRight } from 'ramda'
import { createMiddlewareMock } from 'tests/tests.utils'

import { actions as ApiActions } from '~/api'
import { constants as ApiEducationConstants } from '~/api/education'
import { UserCredentialTypes } from '~/api/users/users.types'
import { actions as UserEducationActions } from '~/modules/UserEducation'

import * as SUT from './Education.middleware'
import { createEducation, createEducationFailure, createEducationSuccess } from './Education.reducer'

describe('modules/Education/Education.middleware', () => {
  describe('createEducationFlow', () => {
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
      const { store, invoke, next } = create(SUT.creatEducationFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiEducationConstants.EDUCATION_CREATE_CONFIG, {
            onSuccess: createEducationSuccess,
            onFailure: createEducationFailure,
          }),
          action.payload,
        ),
      )
    })
  })
  describe('createEducationSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const mockedPayload = {
        data: {
          data: 'EDUCATION DATA',
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
      const { invoke, next } = create(SUT.creatEducationSuccessFlow)
      // when ... we respond to the createEducationSuccess action
      invoke(action)

      // then ...validate createEducationSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle Education create success', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      const mockedPayload = {
        data: {
          data: 'EDUCATION DATA',
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
      const { store, invoke } = create(SUT.creatEducationSuccessFlow)
      // when ... we respond to the createEducationSuccess action
      invoke(action)

      // then ...validate createEducationSuccessFlow
      expect(store.dispatch).toHaveBeenCalledWith(
        // @ts-ignore
        UserEducationActions.createUserEducation('EDUCATION DATA'),
      )
    })
  })
  describe('createEducationFailureFlow', () => {
    it('should correctly handle Education create failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = createEducationFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.creatEducationFailureFlow({ notification: mockNotification }))

      // when ... we respond to the createEducationFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
