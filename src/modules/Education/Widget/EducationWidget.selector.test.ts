import { USER_QUALIFICATIONS_STATE_MOCK } from '~/modules/UserQualifications/UserQualifications.fixture'
import { rootStateFixture } from '~/redux/redux.fixture'

import * as SUT from './EducationWidget.selector'

describe('modules/Education/EducationWidget/EducationWidget.selector', () => {
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
          ids: ['USER_QUALIFICATIONS_STATE_MOCK-001'],
          entities: {
            'USER_QUALIFICATIONS_STATE_MOCK-001': {
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
