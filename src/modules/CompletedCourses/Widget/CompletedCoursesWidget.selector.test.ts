import { USER_QUALIFICATIONS_STATE_MOCK } from '~/modules/UserQualifications/UserQualifications.fixture'
import { rootStateFixture } from '~/redux/redux.fixture'

import * as SUT from './CompletedCoursesWidget.selector'

describe('modules/UserQualifications/CompletedCoursesWidget/CompletedCoursesWidget.selector', () => {
  describe('default', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.default(state)
      // then ...
      expect(result).toEqual({
        count: 0,
        userQualifications: {
          ids: [],
          entities: {},
        },
      })
    })
    it('should return the user qualifications data in the expected format', () => {
      // given ...
      const state = rootStateFixture({
        userQualifications: USER_QUALIFICATIONS_STATE_MOCK,
      })
      // when ...
      const result = SUT.default(state)
      // then ...
      expect(result).toEqual({
        count: 1,
        userQualifications: {
          ids: ['88bbdc39-4146-4e1e-948f-5d33a2cfb3b5'],
          entities: {
            '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              name: 'Test Qualification',
              startDate: '2021-04-15T00:00:00',
              organisationLogoURL: null,
              isValidated: true,
            },
          },
        },
      })
    })
  })
})
