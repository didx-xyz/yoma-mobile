import { mergeRight } from 'ramda'

import { createUserQualification } from '~/modules/UserQualifications/UserQualifications.reducer'

import { createMiddlewareMock } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiQualificationsConstants } from '../../api/Qualifications'
import * as SUT from './Qualifications.middleware'
import { createQualification, createQualificationFailure, createQualificationSuccess } from './Qualifications.reducer'

describe('modules/Qualifications/Qualifications.middleware', () => {
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
      }
      // when ... we create the user's credentials
      const action = createQualification(mockPayload)
      // @ts-ignore
      const { store, invoke, next } = create(SUT.createQualificationFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiQualificationsConstants.QUALIFICATIONS_CREATE_CONFIG, {
            onSuccess: createQualificationSuccess,
            onFailure: createQualificationFailure,
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
      const action = createQualificationSuccess(mockedPayload)
      // @ts-ignore
      const { invoke, next } = create(SUT.createQualificationSuccessFlow)
      // when ... we respond to the createQualificationSuccess action
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
      const action = createQualificationSuccess(mockedPayload)
      // @ts-ignore
      const { store, invoke } = create(SUT.createQualificationSuccessFlow)
      // when ... we respond to the createQualificationSuccess action
      invoke(action)

      // then ...validate createQualificationSuccessFlow
      // @ts-ignore
      expect(store.dispatch).toHaveBeenCalledWith(createUserQualification('QUALIFICATION DATA'))
    })
  })
  describe('createQualificationFailureFlow', () => {
    it('should correctly handle Qualification create failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = createQualificationFailure('FAILED')
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
