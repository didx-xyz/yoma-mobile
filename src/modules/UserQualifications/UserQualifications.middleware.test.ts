import { mergeRight } from 'ramda'
import { createMiddlewareMock } from 'tests/tests.utils'

import { actions as ApiActions, types as ApiTypes } from '~/api'
import { types as ApiUserTypes, constants as ApiUsersConstants } from '~/api/users'
import { actions as QualificationsActions } from '~/modules/Qualifications'
import * as UserFixtures from '~/modules/User/User.fixture'
import * as UserActions from '~/modules/User/User.reducer'

import { userQualificationsStateFixture } from './UserQualifications.fixture'
import * as SUT from './UserQualifications.middleware'
import {
  clearUserQualificationFormValues,
  createUserQualification,
  createUserQualificationCertificate,
  createUserQualificationCertificateSuccess,
  createUserQualificationFailure,
  createUserQualificationSuccess,
  getUserQualificationsSuccess,
  normaliseUserQualificationsSuccess,
  setUserQualificationFormValues,
  setUserQualifications,
  updateUserQualifications,
} from './UserQualifications.reducer'

describe('modules/UserQualifications/UserQualifications.middleware', () => {
  describe('getUserQualificationsFromCredentialsFlow', () => {
    it(' should intercept the credentials data and pass on the correct qualifications data', () => {
      // given ...credential data in an action payload
      const create = createMiddlewareMock(jest)
      const credentialsResponseMock = ['qualification1', 'job1', 'assignment1', 'qualification2']
      const qualificationCredentialsMock = ['qualification1', 'qualification2']
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ... we intercept the data and extract qualifications
      const extractDataFromPayloadMock = jest.fn()
      const extractQualificationsMock = jest.fn(() => qualificationCredentialsMock)
      const { invoke, store, next } = create(
        // @ts-ignore - actual shape of data doesn't matter
        SUT.getUserQualificationsFromCredentialsFlow(extractDataFromPayloadMock, extractQualificationsMock),
      )
      invoke(action)

      // then ... we should pass on the extracted data
      expect(extractQualificationsMock).toHaveBeenCalled()
      // @ts-ignore - actual shape of data doesn't matter
      expect(store.dispatch).toHaveBeenCalledWith(getUserQualificationsSuccess(qualificationCredentialsMock))
      expect(next).toHaveBeenCalledWith(action)
    })
  })
  describe('normaliseUserQualificationsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const qualificationCredentialsMock = [{ id1: 'qualification1' }, { id2: 'qualification2' }]
      const normalisedQualificationsMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'qualification 1', id2: 'qualification 2' },
      }
      const normaliseMock = jest.fn(() => normalisedQualificationsMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getUserQualificationsSuccess(qualificationCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store, next } = create(SUT.normaliseUserQualificationsFlow({ normalise: normaliseMock }))
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should normalise and forward the qualification credentials', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const qualificationCredentialsMock = [{ id1: 'qualification1' }, { id2: 'qualification2' }]
      const normalisedQualificationsMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'qualification 1', id2: 'qualification 2' },
      }
      const normaliseMock = jest.fn(() => normalisedQualificationsMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getUserQualificationsSuccess(qualificationCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store } = create(SUT.normaliseUserQualificationsFlow({ normalise: normaliseMock }))
      invoke(action)

      // then ...
      // @ts-ignore - data shape doesn't matter for test
      expect(store.dispatch).toHaveBeenCalledWith(normaliseUserQualificationsSuccess(normalisedQualificationsMock))
    })
  })
  describe('setUserQualificationsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      const normalisedQualificationsMock = 'NORMALISED CHALLENGES DATA'
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseUserQualificationsSuccess(normalisedQualificationsMock)

      // when ...
      const { invoke, store, next } = create(SUT.setUserQualificationsFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should set the normalised qualification data', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseUserQualificationsSuccess('NORMALISED CHALLENGES DATA')

      // when ... we have qualifications data to store in state
      const { invoke, store } = create(SUT.setUserQualificationsFlow)
      invoke(action)

      // then ...we want to forward it with our reducer action
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      expect(store.dispatch).toHaveBeenCalledWith(setUserQualifications('NORMALISED CHALLENGES DATA'))
    })
  })
  describe('setUserQualificationFormValuesFlow', () => {
    it('should correctly set the form values in state', () => {
      // given ... state with a user id
      const create = createMiddlewareMock(jest, {
        user: UserFixtures.userStateFixture({ id: 'A USER ID' }),
      })

      // when ... we create the user's credentials
      const action = QualificationsActions.createQualification({
        credentialItemId: 'QUALIFICATION ID',
        startTime: '2020-09-09T22:00:00.000Z',
        endTime: '2020-10-09T22:00:00.000Z',
        requestVerification: false,
        // @ts-ignore file shape isn't required for the test
        certificate: 'SOME FILE DATA',
      })

      const { store, invoke, next } = create(SUT.setUserQualificationFormValuesFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      expect(next).toHaveBeenCalledWith(action)
      // ... we should submit the uri to be saved to state
      // @ts-ignore file shape isn't required for the test
      expect(store.dispatch).toHaveBeenCalledWith(
        setUserQualificationFormValues({
          startTime: '2020-09-09T22:00:00.000Z',
          endTime: '2020-10-09T22:00:00.000Z',
          requestVerification: false,
          // @ts-ignore file shape isn't required for the test
          certificate: 'SOME FILE DATA',
          type: ApiUserTypes.UserCredentialTypes.Qualification,
        }),
      )
    })
  })
  describe('createUserQualificationFlow', () => {
    it('should correctly call the api middleware with the payload and correct meta', () => {
      // given ... state with a user id
      const create = createMiddlewareMock(jest, {
        user: UserFixtures.userStateFixture({ id: 'A USER ID' }),
        userQualifications: userQualificationsStateFixture({
          formValues: {
            type: ApiUserTypes.UserCredentialTypes.Qualification,
            startTime: '2020-09-09T22:00:00.000Z',
            endTime: '2020-10-09T22:00:00.000Z',
            requestVerification: false,
            certificate: 'IMAGE CERT',
          },
        }),
      })

      // when ... we create the user's credentials
      // @ts-ignore - we don't need the entire qualification payload for the test
      const action = createUserQualification({
        id: 'QUALIFICATION ID',
        title: 'SOME TITLE',
      })

      const { store, invoke, next } = create(SUT.createUserQualificationFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      expect(next).toHaveBeenCalledWith(action)

      const config = mergeRight(ApiUsersConstants.USERS_CREDENTIALS_GET_BY_TYPE_CONFIG, {
        method: ApiTypes.ApiMethods.Post,
        endpoint: ['A USER ID', ApiUserTypes.UsersEndpoints.Credentials],
      })
      // ... we should call the api middleware with the correct arguments
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserQualificationSuccess,
            onFailure: createUserQualificationFailure,
          }),
          {
            type: ApiUserTypes.UserCredentialTypes.Qualification,
            credentialItemId: 'QUALIFICATION ID',
            startTime: '2020-09-09T22:00:00.000Z',
            endTime: '2020-10-09T22:00:00.000Z',
            requestVerification: false,
          },
        ),
      )
    })
  })
  describe('createUserQualificationSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest, {
        userQualifications: userQualificationsStateFixture({
          formValues: {
            type: ApiUserTypes.UserCredentialTypes.Qualification,
            startTime: '2020-09-09T22:00:00.000Z',
            endTime: '2020-10-09T22:00:00.000Z',
            requestVerification: false,
            certificate: 'IMAGE CERT',
          },
        }),
      })
      const responseMock = {
        data: {
          data: {
            challenge: 'QUALIFICATION DATA',
            id: 'CREDENTIAL ID',
            otherData: 'OTHER DATA',
          },
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }
      const notificationMock = jest.fn()

      const normaliseMock = jest.fn(() => ({
        ids: ['CREDENTIAL ID'],
        entities: {
          'CREDENTIAL ID': {
            // @ts-ignore - data shape is incorrect to type, but sufficiently correct for testing
            challenge: 'CHALLENGE DATA',
            id: 'CREDENTIAL ID',
            otherData: 'OTHER DATA',
          },
        },
      }))

      // @ts-ignore - mocking a quasi-response so typing fails
      const action = createUserQualificationSuccess(responseMock)

      const { store, invoke, next } = create(
        // @ts-ignore - mocking a quasi-response so typing for normalise function fails
        SUT.createUserQualificationSuccessFlow({ normalise: normaliseMock, notification: notificationMock }),
      )
      // when ... we respond to the createUserJobSuccess action
      invoke(action)

      // then ...validate createUserJobSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        updateUserQualifications({
          ids: ['CREDENTIAL ID'],
          entities: {
            'CREDENTIAL ID': {
              // @ts-ignore - data shape is incorrect to type, but sufficiently correct for testing
              challenge: 'CHALLENGE DATA',
              id: 'CREDENTIAL ID',
              otherData: 'OTHER DATA',
            },
          },
        }),
      )
      expect(normaliseMock).toHaveBeenCalled()
      expect(store.dispatch).toHaveBeenCalledWith(
        // @ts-ignore - certificate type is incorrect, but sufficiently correct for testing
        createUserQualificationCertificate({ id: 'CREDENTIAL ID', certificate: 'IMAGE CERT' }),
      )
      expect(store.dispatch).toHaveBeenCalledWith(clearUserQualificationFormValues())
    })
    it('should correctly skip calling certificate if none exists', () => {
      const create = createMiddlewareMock(jest, {
        userQualifications: userQualificationsStateFixture({
          formValues: {
            type: ApiUserTypes.UserCredentialTypes.Qualification,
            startTime: '2020-09-09T22:00:00.000Z',
            endTime: '2020-10-09T22:00:00.000Z',
            requestVerification: false,
          },
        }),
      })
      const responseMock = {
        data: {
          data: {
            challenge: 'QUALIFICATION DATA',
            id: 'CREDENTIAL ID',
            otherData: 'OTHER DATA',
          },
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }
      const notificationMock = jest.fn()

      const normaliseMock = jest.fn(() => ({
        ids: ['CREDENTIAL ID'],
        entities: {
          'CREDENTIAL ID': {
            // @ts-ignore - data shape is incorrect to type, but sufficiently correct for testing
            challenge: 'CHALLENGE DATA',
            id: 'CREDENTIAL ID',
            otherData: 'OTHER DATA',
          },
        },
      }))

      // @ts-ignore - mocking a quasi-response so typing fails
      const action = createUserQualificationSuccess(responseMock)

      const { store, invoke } = create(
        // @ts-ignore - mocking a quasi-response so typing for normalise function fails
        SUT.createUserQualificationSuccessFlow({ normalise: normaliseMock, notification: notificationMock }),
      )
      // when ... we respond to the createUserJobSuccess action
      invoke(action)

      // then ...validate createUserJobSuccessFlow
      expect(store.dispatch).not.toHaveBeenCalledWith(
        // @ts-ignore - certificate type is incorrect, but sufficiently correct for testing
        createUserQualificationCertificate({ id: 'CREDENTIAL ID', certificate: 'IMAGE CERT' }),
      )
    })
  })
  describe('createUserQualificationFailureFlow', () => {
    it('should correctly handle job credentials create failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = createUserQualificationFailure('FAILED')
      const notificationMock = jest.fn()

      const { invoke, next } = create(SUT.createUserQualificationFailureFlow({ notification: notificationMock }))

      // when ... we respond to the createUserJobFailures action
      invoke(action)

      // then ...validate failure
      expect(next).toHaveBeenCalledWith(action)
      expect(notificationMock).toHaveBeenCalled()
    })
  })
  describe('createUserQualificationCertificateFlow', () => {
    it('should correctly call the api middleware with the payload and correct meta', () => {
      // given ... state with a user id
      const create = createMiddlewareMock(jest, {
        user: UserFixtures.userStateFixture({ id: 'A USER ID' }),
        userQualifications: userQualificationsStateFixture({
          formValues: { certificate: { uri: 'FILE URI', type: 'FILE TYPE', name: 'FILE NAME' } },
        }),
      })

      // when ... we create the user's credentials
      const action = createUserQualificationCertificate({
        id: 'A CREDENTIAL ID',
        certificate: {
          uri: 'FILE URI',
          type: 'FILE TYPE',
          name: 'FILE NAME',
          fileCopyUri: 'FILE COPY URI',
          size: 0,
        },
      })

      const { store, invoke, next } = create(SUT.createUserQualificationCertificateFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next

      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
  })
  describe('createUserQualificationCertificateSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const responseMock = {
        data: {
          data: {
            id: 'CREDENTIAL ID',
            otherData: 'OTHER DATA',
          },
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const normaliseMock = jest.fn(() => 'NORMALISED CREDENTIAL')

      // @ts-ignore - mocking a quasi-response so typing fails
      const action = createUserQualificationCertificateSuccess(responseMock)

      const { store, invoke, next } = create(
        // @ts-ignore - normalise mock isn't typesafe
        SUT.createUserQualificationCertificateSuccessFlow({ normalise: normaliseMock }),
      )
      // when ... we respond to the createUserJobSuccess action
      invoke(action)

      // then ...validate createUserJobSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
      // @ts-ignore - testing we're returning correctly. correctly typed value not necessary
      expect(store.dispatch).toHaveBeenCalledWith(updateUserQualifications('NORMALISED CREDENTIAL'))
    })
  })
  describe('createUserQualificationCertificateFailureFlow', () => {
    it('should correctly handle job credentials create failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = createUserQualificationFailure('FAILED')
      const notificationMock = jest.fn()

      const { invoke, next } = create(SUT.createUserQualificationFailureFlow({ notification: notificationMock }))

      // when ... we respond to the createUserJobFailures action
      invoke(action)

      // then ...validate failure
      expect(next).toHaveBeenCalledWith(action)
      expect(notificationMock).toHaveBeenCalled()
    })
  })
})
