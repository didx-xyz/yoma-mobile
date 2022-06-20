import { INITIAL_FORM_VALUES } from '~/modules/UserQualifications/Form/UserQualificationsForm.constants'
import { rootStateFixture } from '~/redux/redux.fixture'

import * as SUT from './CompletedCourses.selector'

describe('modules/CompletedCourses/CompletedCourses.selector', () => {
  describe('selectCompletedCoursesCredentials', () => {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectCompletedCoursesCredentials(state)
      // then ...
      expect(result).toEqual({ ids: [], entities: {} })
    })
    it('should return all the CompletedCourses credentials', () => {
      // given ...
      const state = rootStateFixture({
        userQualifications: {
          ids: ['id1', 'id2', 'id3'],
          entities: {
            id1: { id: 'id1', qualification: { createdByAdmin: true } },
            id2: { id: 'id2', qualification: { createdByAdmin: false } },
            id3: { id: 'id3', qualification: { createdByAdmin: true } },
          },
          formValues: INITIAL_FORM_VALUES,
        },
      })

      // when ...
      const result = SUT.selectCompletedCoursesCredentials(state)

      // then ...
      expect(result).toEqual({
        ids: ['id1', 'id3'],
        entities: {
          id1: { id: 'id1', qualification: { createdByAdmin: true } },
          id3: { id: 'id3', qualification: { createdByAdmin: true } },
        },
      })
    })
  })
})
