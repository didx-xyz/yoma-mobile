import { createMiddlewareStub } from '../../../../tests/tests.utils'
import * as UserActions from '../User.reducer'
import * as SUT from './Challenges.middleware'
import { getChallengesSuccess, normaliseChallengesSuccess } from './Challenges.reducer'
import { challengesFixture, normalisedChallengesFixture } from './Challenges.test.fixtures'

describe('modules/User/Challenges/Challenges.middleware', () => {
  describe('getChallengesFromFetchCredentialsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const credentialsResponseMock = ['challenge1', 'job1', 'assignment1', 'challenge2']
      const extractChallengesMock = jest.fn()
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ...
      const { invoke, next } = create(SUT.getChallengesFromFetchCredentialsFlow(extractChallengesMock))
      invoke(action)

      // then ...
      expect(extractChallengesMock).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    // it('should get all challenge credentials from a list of credentials', () => {
    //   // given ...
    //   // when ...
    //   const result = SUT.getChallengesFromFetchCredentialsFlow()
    //   // then ...
    //   expect(result).toEqual()
    // })
  })
  describe('normaliseChallengesFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const challengesMock = challengesFixture({})
      const action = getChallengesSuccess(challengesMock)

      // when ...
      const { invoke, store, next } = create(SUT.normaliseChallengesFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    // it('should normalise a list of challenge credentials', () => {
    //   // given ...
    //   // when ...
    //   const result = SUT.normaliseChallengesFlow()
    //   // then ...
    //   expect(result).toEqual()
    // })
  })
  describe('setChallengesFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const normalisedCredentialsMock = normalisedChallengesFixture({})
      const action = normaliseChallengesSuccess(normalisedCredentialsMock)

      // when ...
      const { invoke, store, next } = create(SUT.setChallengesFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    // it('should pass all normalised challenges for adding into state', () => {
    //   // given ...
    //   // when ...
    //   const result = SUT.setChallengesFlow()
    //   // then ...
    //   expect(result).toEqual()
    // })
  })
})
