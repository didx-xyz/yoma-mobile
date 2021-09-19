import { mergeRight } from 'ramda'

import { createMiddlewareMock } from '../../../tests/tests.utils'
import { actions as ApiActions, types as ApiTypes } from '../../api'
import { constants as ApiUsersConstants, types as ApiUsersTypes } from '../../api/users'
import { types as HomeNavigationTypes } from '../HomeNavigation'
import * as UserFixtures from '../User/User.fixture'
import * as UserActions from '../User/User.reducer'
import * as SUT from './UserChallenges.middleware'
import {
  createUserChallenge,
  createUserChallengeFailure,
  createUserChallengeSuccess,
  getUserChallengesSuccess,
  normaliseUserChallengesSuccess,
  setUserChallenges,
  updateUserChallenges,
} from './UserChallenges.reducer'

describe('modules/UserChallenges/UserChallenges.middleware', () => {
  describe('createUserChallengeFlow', () => {
    it('should correctly call the api middleware with the payload and correct meta', () => {
      // given ... state with a user id
      const create = createMiddlewareMock(jest, {
        user: UserFixtures.userStateFixture({ id: 'A USER ID' }),
      })

      // when ... we create the user's credentials
      const action = createUserChallenge({
        challengeId: 'CHALLENGE ID',
        startDate: '2020-09-09T22:00:00.000Z',
        endDate: '2020-10-09T22:00:00.000Z',
        requestVerification: false,
      })

      const { store, invoke, next } = create(SUT.createUserChallengeFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      expect(next).toHaveBeenCalledWith(action)

      const config = mergeRight(ApiUsersConstants.USERS_CREDENTIALS_GET_BY_TYPE_CONFIG, {
        method: ApiTypes.ApiMethods.Post,
        endpoint: ['A USER ID', ApiUsersTypes.UsersEndpoints.Credentials],
      })
      // ... we should call the api middleware with the correct arguments
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserChallengeSuccess,
            onFailure: createUserChallengeFailure,
          }),
          {
            type: ApiUsersTypes.UserCredentialTypes.Challenge,
            credentialItemId: 'CHALLENGE ID',
            startTime: '2020-09-09T22:00:00.000Z',
            endTime: '2020-10-09T22:00:00.000Z',
            requestVerification: false,
          },
        ),
      )
    })
  })
  describe('createUserChallengeSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const responseMock = {
        data: {
          data: {
            challenge: 'CHALLENGE DATA',
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
      const navigateMock = jest.fn()

      // @ts-ignore - mocking a quasi-response so typing fails
      const action = createUserChallengeSuccess(responseMock)

      const { store, invoke, next } = create(
        SUT.createUserChallengeSuccessFlow({ notification: notificationMock, navigate: navigateMock }),
      )
      // when ... we respond to the createUserJobSuccess action
      invoke(action)

      // then ...validate createUserJobSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        updateUserChallenges({
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
      expect(notificationMock).toHaveBeenCalled()
      expect(navigateMock).toHaveBeenCalledWith(HomeNavigationTypes.HomeNavigationRoutes.Home)
    })
  })
  describe('createUserChallengeFailureFlow', () => {
    it('should correctly handle job credentials create failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = createUserChallengeFailure('FAILED')
      const notificationMock = jest.fn()

      const { invoke, next } = create(SUT.createUserChallengeFailureFlow({ notification: notificationMock }))

      // when ... we respond to the createUserJobFailures action
      invoke(action)

      // then ...validate failure
      expect(next).toHaveBeenCalledWith(action)
      expect(notificationMock).toHaveBeenCalled()
    })
  })
  describe('getUserChallengesFromCredentialsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const credentialsResponseMock = ['challenge1', 'job1', 'assignment1', 'challenge2']
      const extractDataFromPayloadMock = jest.fn()
      const extractChallengesMock = jest.fn()
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ...
      const { invoke, next } = create(
        SUT.getUserChallengesFromCredentialsFlow(extractDataFromPayloadMock, extractChallengesMock),
      )
      invoke(action)

      // then ...
      expect(extractChallengesMock).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it(' should intercept the credentials data and pass on the correct challenges data', () => {
      // given ...credential data in an action payload
      const create = createMiddlewareMock(jest)
      const credentialsResponseMock = ['challenge1', 'job1', 'assignment1', 'challenge2']
      const challengeCredentialsMock = ['challenge1', 'challenge2']
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ... we intercept the data and extract challenges
      const extractDataFromPayloadMock = jest.fn()
      const extractChallengesMock = jest.fn(() => challengeCredentialsMock)
      const { invoke, store } = create(
        // @ts-ignore - actual shape of data doesn't matter
        SUT.getUserChallengesFromCredentialsFlow(extractDataFromPayloadMock, extractChallengesMock),
      )
      invoke(action)

      // then ... we should pass on the extracted data
      expect(extractChallengesMock).toHaveBeenCalled()
      // @ts-ignore - actual shape of data doesn't matter
      expect(store.dispatch).toHaveBeenCalledWith(getUserChallengesSuccess(challengeCredentialsMock))
    })
  })
  describe('normaliseUserChallengesFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const challengeCredentialsMock = [{ id1: 'challenge1' }, { id2: 'challenge2' }]
      const normalisedChallengesMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'challenge 1', id2: 'challenge 2' },
      }
      const normaliseMock = jest.fn(() => normalisedChallengesMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getUserChallengesSuccess(challengeCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store, next } = create(SUT.normaliseUserChallengesFlow(normaliseMock))
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should normalise and forward the challenge credentials', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const challengeCredentialsMock = [{ id1: 'challenge1' }, { id2: 'challenge2' }]
      const normalisedChallengesMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'challenge 1', id2: 'challenge 2' },
      }
      const normaliseMock = jest.fn(() => normalisedChallengesMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getUserChallengesSuccess(challengeCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store } = create(SUT.normaliseUserChallengesFlow(normaliseMock))
      invoke(action)

      // then ...
      // @ts-ignore - data shape doesn't matter for test
      expect(store.dispatch).toHaveBeenCalledWith(normaliseUserChallengesSuccess(normalisedChallengesMock))
    })
  })
  describe('setUserChallengesFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      const normalisedChallengesMock = 'NORMALISED CHALLENGES DATA'
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseUserChallengesSuccess(normalisedChallengesMock)

      // when ...
      const { invoke, store, next } = create(SUT.setUserChallengesFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should set the normalised challenge data', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseUserChallengesSuccess('NORMALISED CHALLENGES DATA')

      // when ... we have challenges data to store in state
      const { invoke, store } = create(SUT.setUserChallengesFlow)
      invoke(action)

      // then ...we want to forward it with our reducer action
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      expect(store.dispatch).toHaveBeenCalledWith(setUserChallenges('NORMALISED CHALLENGES DATA'))
    })
  })
})
