import { rootStateFixture } from '../../../redux/redux.test.fixtures'
import { USER_CHALLENGES_STATE_MOCK } from '../../UserChallenges/UserChallenges.fixture'
import * as SUT from './CompletedChallengesView.selector'

describe('modules/CompletedChallenges/CompletedChallengesView/CompletedChallengesView.selector', () => {
  describe('default selector', () => {
    it('should handle an empty state', () => {
      const stateMock = rootStateFixture()
      // when ... we call the selector
      // @ts-ignore
      const result = SUT.default(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        userChallenges: {
          ids: [],
          entities: {},
        },
      })
    })
    it('should return userChallenges, skills and organisations lists', () => {
      const mockState = rootStateFixture({
        userChallenges: USER_CHALLENGES_STATE_MOCK,
      })
      // when ... we call the selector
      const result = SUT.default(mockState)

      // then ... should return the data required by the experience view
      expect(result).toEqual({
        userChallenges: {
          ids: ['88bbdc39-4146-4e1e-948f-5d33a2cfb3b5', 'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5'],
          entities: {
            '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              title: 'Test Graph',
              metadata: ['Test Org', 'Apr 2021 - Apr 2021'],
              iconUrl: null,
              isValidated: true,
              description: 'Test Graph',
            },
            'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              title: 'Test Graph2',
              metadata: ['Test Org 2', 'Apr 2021 - Apr 2021'],
              iconUrl: null,
              isValidated: true,
              description: 'Test Graph2',
            },
          },
        },
      })
    })
  })
})
