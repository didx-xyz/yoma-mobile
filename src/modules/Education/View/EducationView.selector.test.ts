import { USER_EDUCATION_STATE_MOCK } from '~/modules/UserEducation/UserEducation.fixture'
import { rootStateFixture } from '~/redux/redux.fixture'

import * as SUT from './EducationView.selector'

describe('modules/Education/EducationView/EducationView.selector', () => {
  describe('default selector', () => {
    it('should handle an empty state', () => {
      const stateMock = rootStateFixture()
      // when ... we call the selector
      // @ts-ignore
      const result = SUT.default(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        userEducation: {
          ids: [],
          entities: {},
        },
      })
    })
    it('should return userEducation, skills and organisations lists', () => {
      const mockState = rootStateFixture({
        userEducation: USER_EDUCATION_STATE_MOCK,
      })
      // when ... we call the selector
      const result = SUT.default(mockState)

      // then ... should return the data required by the education view
      expect(result).toEqual({
        userEducation: {
          ids: ['USER_EDUCATION_STATE_MOCK-001'],
          entities: {
            'USER_EDUCATION_STATE_MOCK-001': {
              title: 'Test Education',
              createdByAdmin: true,
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
