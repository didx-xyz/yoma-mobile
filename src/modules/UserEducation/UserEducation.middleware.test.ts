import { mergeRight } from 'ramda'
import { createMiddlewareMock } from 'tests/tests.utils'

import { actions as ApiActions, types as ApiTypes } from '~/api'
import { types as ApiUserTypes, constants as ApiUsersConstants } from '~/api/users'
import { actions as EducationActions } from '~/modules/Education'
import * as UserFixtures from '~/modules/User/User.fixture'
import * as UserActions from '~/modules/User/User.reducer'

import { userEducationStateFixture } from './UserEducation.fixture'
import * as SUT from './UserEducation.middleware'
import {
  clearUserEducationFormValues,
  createUserEducation,
  createUserEducationCertificate,
  createUserEducationCertificateSuccess,
  createUserEducationFailure,
  createUserEducationSuccess,
  getUserEducationSuccess,
  normaliseUserEducationSuccess,
  setUserEducation,
  setUserEducationFormValues,
  updateUserEducation,
} from './UserEducation.reducer'

describe('modules/UserEducation/UserEducation.middleware', () => {
  describe('getUserEducationFromCredentialsFlow', () => {
    it(' should intercept the credentials data and pass on the correct education data', () => {
      // given ...credential data in an action payload
      const create = createMiddlewareMock(jest)
      const credentialsResponseMock = ['qualification1', 'job1', 'assignment1', 'qualification2']
      const qualificationCredentialsMock = ['qualification1', 'qualification2']
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ... we intercept the data and extract education
      const extractDataFromPayloadMock = jest.fn()
      const extractEducationMock = jest.fn(() => qualificationCredentialsMock)
      const { invoke, store, next } = create(
        // @ts-ignore - actual shape of data doesn't matter
        SUT.getUserEducationFromCredentialsFlow(extractDataFromPayloadMock, extractEducationMock),
      )
      invoke(action)

      // then ... we should pass on the extracted data
      expect(extractEducationMock).toHaveBeenCalled()
      // @ts-ignore - actual shape of data doesn't matter
      expect(store.dispatch).toHaveBeenCalledWith(getUserEducationSuccess(qualificationCredentialsMock))
      expect(next).toHaveBeenCalledWith(action)
    })
  })
  describe('normaliseUserEducationFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const qualificationCredentialsMock = [{ id1: 'qualification1' }, { id2: 'qualification2' }]
      const normalisedEducationMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'qualification 1', id2: 'qualification 2' },
      }
      const normaliseMock = jest.fn(() => normalisedEducationMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getUserEducationSuccess(qualificationCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store, next } = create(SUT.normaliseUserEducationFlow({ normalise: normaliseMock }))
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should normalise and forward the qualification credentials', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const qualificationCredentialsMock = [{ id1: 'qualification1' }, { id2: 'qualification2' }]
      const normalisedEducationMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'qualification 1', id2: 'qualification 2' },
      }
      const normaliseMock = jest.fn(() => normalisedEducationMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getUserEducationSuccess(qualificationCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store } = create(SUT.normaliseUserEducationFlow({ normalise: normaliseMock }))
      invoke(action)

      // then ...
      // @ts-ignore - data shape doesn't matter for test
      expect(store.dispatch).toHaveBeenCalledWith(normaliseUserEducationSuccess(normalisedEducationMock))
    })
  })
  describe('setUserEducationFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      const normalisedEducationMock = 'NORMALISED CHALLENGES DATA'
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseUserEducationSuccess(normalisedEducationMock)

      // when ...
      const { invoke, store, next } = create(SUT.setUserEducationFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should set the normalised qualification data', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseUserEducationSuccess('NORMALISED CHALLENGES DATA')

      // when ... we have education data to store in state
      const { invoke, store } = create(SUT.setUserEducationFlow)
      invoke(action)

      // then ...we want to forward it with our reducer action
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      expect(store.dispatch).toHaveBeenCalledWith(setUserEducation('NORMALISED CHALLENGES DATA'))
    })
  })
  describe('setUserEducationFormValuesFlow', () => {
    it('should correctly set the form values in state', () => {
      // given ... state with a user id
      const create = createMiddlewareMock(jest, {
        user: UserFixtures.userStateFixture({ id: 'A USER ID' }),
      })

      // when ... we create the user's credentials
      const action = EducationActions.createEducation({
        credentialItemId: 'QUALIFICATION ID',
        startTime: '2020-09-09T22:00:00.000Z',
        endTime: '2020-10-09T22:00:00.000Z',
        requestVerification: false,
        // @ts-ignore file shape isn't required for the test
        certificate: 'SOME FILE DATA',
      })

      const { store, invoke, next } = create(SUT.setUserEducationFormValuesFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      expect(next).toHaveBeenCalledWith(action)
      // ... we should submit the uri to be saved to state
      // @ts-ignore file shape isn't required for the test
      expect(store.dispatch).toHaveBeenCalledWith(
        setUserEducationFormValues({
          startTime: '2020-09-09T22:00:00.000Z',
          endTime: '2020-10-09T22:00:00.000Z',
          requestVerification: false,
          // @ts-ignore file shape isn't required for the test
          certificate: 'SOME FILE DATA',
          type: ApiUserTypes.UserCredentialTypes.Education,
        }),
      )
    })
  })
  describe('createUserEducationFlow', () => {
    it('should correctly call the api middleware with the payload and correct meta', () => {
      // given ... state with a user id
      const create = createMiddlewareMock(jest, {
        user: UserFixtures.userStateFixture({ id: 'A USER ID' }),
        userEducation: userEducationStateFixture({
          formValues: {
            type: ApiUserTypes.UserCredentialTypes.Education,
            startTime: '2020-09-09T22:00:00.000Z',
            endTime: '2020-10-09T22:00:00.000Z',
            requestVerification: false,
            certificate: 'IMAGE CERT',
          },
        }),
      })

      // when ... we create the user's credentials
      // @ts-ignore - we don't need the entire qualification payload for the test
      const action = createUserEducation({
        id: 'QUALIFICATION ID',
        title: 'SOME TITLE',
      })

      const { store, invoke, next } = create(SUT.createUserEducationFlow)
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
            onSuccess: createUserEducationSuccess,
            onFailure: createUserEducationFailure,
          }),
          {
            type: ApiUserTypes.UserCredentialTypes.Education,
            credentialItemId: 'QUALIFICATION ID',
            startTime: '2020-09-09T22:00:00.000Z',
            endTime: '2020-10-09T22:00:00.000Z',
            requestVerification: false,
          },
        ),
      )
    })
  })
  describe('createUserEducationSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest, {
        userEducation: userEducationStateFixture({
          formValues: {
            type: ApiUserTypes.UserCredentialTypes.Education,
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
      const action = createUserEducationSuccess(responseMock)

      const { store, invoke, next } = create(
        // @ts-ignore - mocking a quasi-response so typing for normalise function fails
        SUT.createUserEducationSuccessFlow({ normalise: normaliseMock, notification: notificationMock }),
      )
      // when ... we respond to the createUserEducationSuccess action
      invoke(action)

      // then ...validate createUserEducationSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        updateUserEducation({
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
        createUserEducationCertificate({ id: 'CREDENTIAL ID', certificate: 'IMAGE CERT' }),
      )
      expect(store.dispatch).toHaveBeenCalledWith(clearUserEducationFormValues())
    })
    it('should correctly skip calling certificate if none exists', () => {
      const create = createMiddlewareMock(jest, {
        userEducation: userEducationStateFixture({
          formValues: {
            type: ApiUserTypes.UserCredentialTypes.Education,
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
      const action = createUserEducationSuccess(responseMock)

      const { store, invoke } = create(
        // @ts-ignore - mocking a quasi-response so typing for normalise function fails
        SUT.createUserEducationSuccessFlow({ normalise: normaliseMock, notification: notificationMock }),
      )
      // when ... we respond to the createUserEducationSuccess action
      invoke(action)

      // then ...validate createUserEducationSuccessFlow
      expect(store.dispatch).not.toHaveBeenCalledWith(
        // @ts-ignore - certificate type is incorrect, but sufficiently correct for testing
        createUserEducationCertificate({ id: 'CREDENTIAL ID', certificate: 'IMAGE CERT' }),
      )
    })
  })
  describe('createUserEducationFailureFlow', () => {
    it('should correctly handle job credentials create failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = createUserEducationFailure('FAILED')
      const notificationMock = jest.fn()

      const { invoke, next } = create(SUT.createUserEducationFailureFlow({ notification: notificationMock }))

      // when ... we respond to the createUserEducationFailure action
      invoke(action)

      // then ...validate failure
      expect(next).toHaveBeenCalledWith(action)
      expect(notificationMock).toHaveBeenCalled()
    })
  })
  describe('createUserEducationCertificateFlow', () => {
    it('should correctly call the api middleware with the payload and correct meta', () => {
      // given ... state with a user id
      const create = createMiddlewareMock(jest, {
        user: UserFixtures.userStateFixture({ id: 'A USER ID' }),
        userEducation: userEducationStateFixture({
          formValues: { certificate: { uri: 'FILE URI', type: 'FILE TYPE', name: 'FILE NAME' } },
        }),
      })

      // when ... we create the user's credentials
      const action = createUserEducationCertificate({
        id: 'A CREDENTIAL ID',
        certificate: {
          uri: 'FILE URI',
          type: 'FILE TYPE',
          name: 'FILE NAME',
          fileCopyUri: 'FILE COPY URI',
          size: 0,
        },
      })

      const { store, invoke, next } = create(SUT.createUserEducationCertificateFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next

      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
  })
  describe('createUserEducationCertificateSuccessFlow', () => {
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
      const action = createUserEducationCertificateSuccess(responseMock)

      const { store, invoke, next } = create(
        // @ts-ignore - normalise mock isn't typesafe
        SUT.createUserEducationCertificateSuccessFlow({ normalise: normaliseMock }),
      )
      // when ... we respond to the createUserEducationCertificateSuccessFlow action
      invoke(action)

      // then ...validate createUserEducationCertificateSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
      // @ts-ignore - testing we're returning correctly. correctly typed value not necessary
      expect(store.dispatch).toHaveBeenCalledWith(updateUserEducation('NORMALISED CREDENTIAL'))
    })
  })
  describe('createUserEducationCertificateFailureFlow', () => {
    it('should correctly handle job credentials create failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = createUserEducationFailure('FAILED')
      const notificationMock = jest.fn()

      const { invoke, next } = create(SUT.createUserEducationFailureFlow({ notification: notificationMock }))

      // when ... we respond to the createUserEducationFailure action
      invoke(action)

      // then ...validate failure
      expect(next).toHaveBeenCalledWith(action)
      expect(notificationMock).toHaveBeenCalled()
    })
  })
})
