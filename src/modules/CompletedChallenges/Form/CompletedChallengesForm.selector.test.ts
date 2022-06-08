import { challengesStateFixture } from '~/modules/Challenges/Challenges.fixture'
import { rootStateFixture } from '~/redux/redux.fixture'

import SUT from './CompletedChallengesForm.selector'

describe('modules/CompletedChallenges/Form/CompletedChallengesForm.selector', () => {
  describe('selector', () => {
    it(`should return empty data for challenges and dropdown data,
    when we load the completed challenges form, given an empty state`, () => {
      // given ... an empty state
      const stateMock = rootStateFixture()
      // when ... we load the completed challenges form
      const result = SUT(stateMock)
      // then ... should select the challenges and correctly formatted dropdown challenges
      expect(result).toEqual({
        challenges: {
          ids: [],
          entities: {},
        },
        challengesDropDown: [],
      })
    })
    it('should return all challenges and correctly formatted challengesDropdown array, when we load the completed challenges, given populated data', () => {
      // given ...
      const stateMock = rootStateFixture({
        challenges: challengesStateFixture(),
      })
      // when ... we load the completed challenges
      const result = SUT(stateMock)
      // then ... should return all challenges and correctly formatted challengesDropdown array
      expect(result).toEqual({
        challenges: challengesStateFixture(),
        challengesDropDown: [
          { value: '2598575f-5caf-42ff-f314-08d7fc042142', label: 'Covid-19' },
          { value: '19fcf710-d250-48ba-b630-08d81d3222f2', label: 'Test Retool Challenge' },
          { value: '4fc8c0a4-8856-41e4-34e1-08d86faaeb08', label: 'Tideturners Challenge' },
          { value: '04cd1679-e013-4de9-565a-08d8d4b42f40', label: 'Test Challenge' },
          { value: '61b3783c-2f7b-46b5-2e05-08d92e9e2636', label: 'Make Your Own Bingo!' },
        ],
      })
    })
  })
})
