import { USER_QUALIFICATIONS_STATE_MOCK } from '~/modules/UserQualifications/UserQualifications.fixture'
import { rootStateFixture } from '~/redux/redux.fixture'

import * as SUT from './CompletedCoursesView.selector'

describe('modules/CompletedCourses/CompletedCoursesView/CompletedCoursesView.selector', () => {
  describe('default selector', () => {
    it('should handle an empty state', () => {
      const stateMock = rootStateFixture()
      // when ... we call the selector
      // @ts-ignore
      const result = SUT.default(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        userQualifications: {
          ids: [],
          entities: {},
        },
      })
    })
    it('should return userQualifications, skills and organisations lists', () => {
      const mockState = rootStateFixture({
        userQualifications: USER_QUALIFICATIONS_STATE_MOCK,
      })
      // when ... we call the selector
      const result = SUT.default(mockState)

      // then ... should return the data required by the education view
      expect(result).toEqual({
        userQualifications: {
          ids: ['88bbdc39-4146-4e1e-948f-5d33a2cfb3b5'],
          entities: {
            '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              title: 'Test Qualification',
              metadata: ['Apr 2021'],
              iconUrl: null,
              isValidated: true,
              description: 'Test Graph',
            },
          },
        },
      })
    })
  })
})
