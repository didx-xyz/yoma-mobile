import { createMiddlewareStub } from '../../../../tests/tests.utils'
import * as UserActions from '../User.reducer'
import * as SUT from './Challenges.middleware'
import { getChallengesSuccess, normaliseChallengesSuccess, setChallenges } from './Challenges.reducer'

describe('modules/User/Challenges/Challenges.middleware', () => {
  describe('getChallengesFromCredentialsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const credentialsResponseMock = ['challenge1', 'job1', 'assignment1', 'challenge2']
      const extractChallengesMock = jest.fn()
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ...
      const { invoke, next } = create(SUT.getChallengesFromCredentialsFlow(extractChallengesMock))
      invoke(action)

      // then ...
      expect(extractChallengesMock).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it(' should intercept the credentials data and pass on the correct challenges data', () => {
      // given ...credential data in an action payload
      const create = createMiddlewareStub(jest)
      const credentialsResponseMock = ['challenge1', 'job1', 'assignment1', 'challenge2']
      const challengeCredentialsMock = ['challenge1', 'challenge2']
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ... we intercept the data and extract challenges
      const extractChallengesMock = jest.fn(() => challengeCredentialsMock)
      const { invoke, store } = create(SUT.getChallengesFromCredentialsFlow(extractChallengesMock))
      invoke(action)

      // then ... we should pass on the extracted data
      expect(extractChallengesMock).toHaveBeenCalled()
      // @ts-ignore - actual shape of data doesn't matter
      expect(store.dispatch).toHaveBeenCalledWith(getChallengesSuccess(challengeCredentialsMock))
    })
  })
  describe('normaliseChallengesFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const challengeCredentialsMock = [{ id1: 'challenge1' }, { id2: 'challenge2' }]
      const normalisedChallengesMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'challenge 1', id2: 'challenge 2' },
      }
      const normaliseMock = jest.fn(() => normalisedChallengesMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getChallengesSuccess(challengeCredentialsMock)

      // when ...
      const { invoke, store, next } = create(SUT.normaliseChallengesFlow(normaliseMock))
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should normalise and forward the challenge credentials', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const challengeCredentialsMock = [{ id1: 'challenge1' }, { id2: 'challenge2' }]
      const normalisedChallengesMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'challenge 1', id2: 'challenge 2' },
      }
      const normaliseMock = jest.fn(() => normalisedChallengesMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getChallengesSuccess(challengeCredentialsMock)

      // when ...
      const { invoke, store } = create(SUT.normaliseChallengesFlow(normaliseMock))
      invoke(action)

      // then ...
      // @ts-ignore - data shape doesn't matter for test
      expect(store.dispatch).toHaveBeenCalledWith(normaliseChallengesSuccess(normalisedChallengesMock))
    })
  })
  describe('setChallengesFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)

      const normalisedChallengesMock = 'NORMALISED CHALLENGES DATA'
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseChallengesSuccess(normalisedChallengesMock)

      // when ...
      const { invoke, store, next } = create(SUT.setChallengesFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should set the normalised challenge data', () => {
      // given ...
      const create = createMiddlewareStub(jest)

      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseChallengesSuccess('NORMALISED CHALLENGES DATA')

      // when ... we have challenges data to store in state
      const { invoke, store } = create(SUT.setChallengesFlow)
      invoke(action)

      // then ...we want to forward it with our reducer action
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      expect(store.dispatch).toHaveBeenCalledWith(setChallenges('NORMALISED CHALLENGES DATA'))
    })
  })
})
