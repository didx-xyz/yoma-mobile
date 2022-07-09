import { rootStateFixture } from '~/redux/redux.fixture'

import { challengesStateFixture } from './Challenges.fixture'
import * as SUT from './Challenges.selectors'

describe('modules/Challenges/Form/ChallengesForm.selector', () => {
  describe('selector', () => {
    it('should return empty data for challenges when we load the completed challenges form, given an empty state', () => {
      // given ... an empty state
      const stateMock = rootStateFixture()
      // when ... we load the completed challenges form
      const result = SUT.selectChallenges(stateMock)
      // then ... should select the challenges
      expect(result).toEqual({
        ids: [],
        entities: {},
      })
    })
    it('should return all challenges, when we load the completed challenges, given populated data', () => {
      // given ...
      const stateMock = rootStateFixture({
        challenges: challengesStateFixture(),
      })
      // when ... we load the completed challenges
      const result = SUT.selectChallenges(stateMock)
      // then ... should return all challenges
      expect(result).toEqual({
        ...challengesStateFixture(),
      })
    })
  })
})
