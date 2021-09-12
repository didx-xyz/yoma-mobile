import { rootStateFixture } from '../../../redux/redux.fixture'
import { USER_JOBS_NORMALISED_MOCK } from '../../UserJobs/UserJobs.test.fixtures'
import * as SUT from './ExperienceView.selector'

describe('modules/Experience/Experience.selector', () => {
  describe('default selector', () => {
    it('should handle an empty state', () => {
      const stateMock = rootStateFixture()
      // when ... we call the selector
      // @ts-ignore
      const result = SUT.default(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        userJobs: {
          ids: [],
          entities: {},
        },
      })
    })
    it('should return userJobs, skills and organisations lists', () => {
      const mockState = rootStateFixture({
        userJobs: USER_JOBS_NORMALISED_MOCK,
      })
      // when ... we call the selector
      const result = SUT.default(mockState)

      // then ... should return the data required by the experience view
      expect(result).toEqual({
        userJobs: {
          ids: ['11111-5717-4562-b3fc-2c963f66afa6'],
          entities: {
            '11111-5717-4562-b3fc-2c963f66afa6': {
              title: 'TITLE',
              metadata: ['NAME', 'Jun 2021 - Aug 2021 • 2 months', 'COUNTRY'],
              iconUrl: 'LOGO',
              isValidated: true,
              description: 'DESCRIPTION',
            },
          },
        },
      })
    })
  })
})
