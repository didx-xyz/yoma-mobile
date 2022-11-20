import { USER_EDUCATION_STATE_MOCK } from '~/modules/UserEducation/UserEducation.fixture'
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
        userEducation: {
          ids: [],
          entities: {},
        },
      })
    })
    it('should return the user education data in the expected format', () => {
      // given ...
      const state = rootStateFixture({
        userEducation: USER_EDUCATION_STATE_MOCK,
      })
      // when ...
      const result = SUT.default(state)
      // then ...
      expect(result).toEqual({
        count: 2,
        userEducation: {
          ids: ['USER_EDUCATION_STATE_MOCK-001', 'USER_EDUCATION_STATE_MOCK-002'],
          entities: {
            'USER_EDUCATION_STATE_MOCK-001': {
              title: 'Test Education',
              startDate: '2021-04-15T00:00:00',
              organisationLogoURL: null,
              isValidated: true,
            },
            'USER_EDUCATION_STATE_MOCK-002': {
              title: 'Test Education',
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
