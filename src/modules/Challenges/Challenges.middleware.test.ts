import { mergeRight } from 'ramda'

import { createMiddlewareMock } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiChallengesConstants } from '../../api/challenges'
import { rootStateFixture } from '../../redux/redux.fixture'
import * as SUT from './Challenges.middleware'
import {
  fetchChallenges,
  fetchChallengesFailure,
  fetchChallengesSuccess,
  normaliseChallengesSuccess,
  setChallenges,
} from './Challenges.reducer'

describe('modules/Challenges/Challenges.middleware', () => {
  describe('fetchChallengesFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = fetchChallenges()
      // @ts-ignore
      const { invoke, next } = create(SUT.fetchChallengesFlow)

      // when ... we respond to the fetchChallenges action
      invoke(action)

      // then ...validate fetchChallengesFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle fetching the organisations state', () => {
      // given ...
      const mockState = rootStateFixture()

      const create = createMiddlewareMock(jest, mockState)
      const action = fetchChallenges()
      // @ts-ignore
      const { invoke, store } = create(SUT.fetchChallengesFlow)
      // when ... we respond to the fetchChallenges action
      invoke(action)

      // then ...validate fetchChallengesFlow
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiChallengesConstants.CHALLENGES_GET_ALL_CONFIG, {
            onSuccess: fetchChallengesSuccess,
            onFailure: fetchChallengesFailure,
          }),
        ),
      )
    })
  })
  describe('normaliseChallengesFlow', () => {
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
      const action = fetchChallengesSuccess(challengeCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store, next } = create(SUT.normaliseChallengesFlow({ normalise: normaliseMock }))
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
      const action = fetchChallengesSuccess(challengeCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store } = create(SUT.normaliseChallengesFlow({ normalise: normaliseMock }))
      invoke(action)

      // then ...
      // @ts-ignore - data shape doesn't matter for test
      expect(store.dispatch).toHaveBeenCalledWith(normaliseChallengesSuccess(normalisedChallengesMock))
    })
  })
  describe('setChallengesFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)

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
      const create = createMiddlewareMock(jest)

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
