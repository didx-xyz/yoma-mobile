import { createMiddlewareMock } from '../../../tests/tests.utils'
import * as UserActions from '../User/User.reducer'
import * as SUT from './UserChallenges.middleware'
import { getUserChallengesSuccess, normaliseUserChallengesSuccess, setUserChallenges } from './UserChallenges.reducer'

describe('modules/CompletedChallenges/CompletedChallenges.middleware', () => {
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
