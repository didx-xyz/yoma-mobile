import { mergeRight } from 'ramda'
import { rootStateFixture } from 'redux/redux.test.fixtures'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiQualificationsConstants } from '../../api/qualifications'
import * as SUT from './Qualifications.middleware'
import {
  createQualifications,
  createQualificationsFailure,
  createQualificationsSuccess,
  setQualifications,
} from './Qualifications.reducer'
import { extractQualificationsFromPayload } from './Qualifications.utils'

describe('modules/Qualifications/Qualifications.middleware', () => {
  describe('createQualificationsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const mockState = rootStateFixture({})

      const create = createMiddlewareStub(jest, mockState)
      const mockPayload = {
        skillNames: ['SKILL'],
        title: 'TITLE',
        description: 'DESCRIPTION',
        organisationId: 'ORGANISATION_ID',
        url: 'URL',
        country: 'COUNTRY',
        language: 'EN',
        startTime: '2021-07-04T10:45:00Z',
        endTime: '2021-07-18T10:45:00Z',
        published: false,
      }
      const action = createQualifications(mockPayload)
      // @ts-ignore
      const { invoke, next } = create(SUT.createQualificationsFlow)

      // when ... we respond to the createQualifications action
      invoke(action)

      // then ...validate createQualificationsFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle updating the qualifications state', () => {
      // given ...
      const mockState = rootStateFixture({})
      const mockPayload = {
        skillNames: ['SKILL'],
        title: 'TITLE',
        description: 'DESCRIPTION',
        organisationId: 'ORGANISATION_ID',
        url: 'URL',
        country: 'COUNTRY',
        language: 'EN',
        startTime: '2021-07-04T10:45:00Z',
        endTime: '2021-07-18T10:45:00Z',
        published: false,
      }
      const create = createMiddlewareStub(jest, mockState)
      const action = createQualifications(mockPayload)
      // @ts-ignore
      const { invoke, store } = create(SUT.createQualificationsFlow)
      // when ... we respond to the updateQualifications action
      invoke(action)

      // then ...validate createQualificationsFlow
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiQualificationsConstants.QUALIFICATIONS_CREATE_CONFIG, {
            onSuccess: createQualificationsSuccess,
            onFailure: createQualificationsFailure,
          }),
          action.payload,
        ),
      )
    })
  })
  describe('createQualificationsSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()
      const mockResponseData = {
        id: 'c934816b-8be8-4b10-9b72-08d94fb4df8a',
        skills: ['SKILL'],
        title: 'TITLE',
        description: 'DESCRIPTION',
        url: 'URL',
        createdAt: '2021-07-27T10:49:32.1368906Z',
        zltoReward: null,
        createdByAdmin: false,
        language: 'EN',
        startTime: '2021-07-04T10:45:00Z',
        endTime: '2021-07-18T10:45:00Z',
        published: false,
      }

      const action = createQualificationsSuccess(mockResponseData)
      // @ts-ignore
      const { invoke, next } = create(SUT.createQualificationsSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the createQualificationsSuccess action
      invoke(action)
      // then ...validate createQualificationsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly set qualifications on successful fetch', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockNotification = jest.fn()
      const mockResponseData = {
        id: 'c934816b-8be8-4b10-9b72-08d94fb4df8a',
        skills: ['SKILL'],
        title: 'TITLE',
        description: 'DESCRIPTION',
        url: 'URL',
        createdAt: '2021-07-27T10:49:32.1368906Z',
        zltoReward: null,
        createdByAdmin: false,
        language: 'EN',
        startTime: '2021-07-04T10:45:00Z',
        endTime: '2021-07-18T10:45:00Z',
        published: false,
      }

      const action = createQualificationsSuccess(mockResponseData)
      // @ts-ignore
      const { store, invoke } = create(SUT.createQualificationsSuccessFlow({ notification: mockNotification }))
      // when ... we respond to the createQualificationsSuccessFlow action
      invoke(action)
      // then ... set updated qualification
      const qualification = extractQualificationsFromPayload(action)
      expect(store.dispatch).toHaveBeenCalledWith(setQualifications(qualification))
    })
  })
  describe('createQualificationsFailureFlow', () => {
    it('should correctly handle qualifications fetch failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = createQualificationsFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.createQualificationsFailureFlow({ notification: mockNotification }))

      // when ... we respond to the createQualificationsFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
