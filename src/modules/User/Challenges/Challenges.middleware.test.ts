import { createMiddlewareStub } from '../../../../tests/tests.utils'
import * as UserActions from '../User.reducer'
import { credentialsResponseFixture } from '../User.test.fixtures'
import * as SUT from './Challenges.middleware'
import { getChallengesSuccess, normalisedChallenges } from './Challenges.reducer'
import { challengesFixture, normalisedChallengesFixture } from './Challenges.test.fixtures'

describe('modules/User/Challenges/Challenges.middleware', () => {
  describe('getChallengesFromFetchCredentialsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const credentialsResponseMock = credentialsResponseFixture()
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ...
      const { invoke, store, next } = create(SUT.getChallengesFromFetchCredentialsFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
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
      const action = normalisedChallenges(normalisedCredentialsMock)

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
