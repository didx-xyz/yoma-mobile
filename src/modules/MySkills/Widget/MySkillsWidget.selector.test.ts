import { USER_SKILLS_STATE_MOCK } from '~/modules/UserSkills/UserSkills.fixture'
import { rootStateFixture } from '~/redux/redux.fixture'

import * as SUT from './MySkillsWidget.selector'

describe('modules/MySkills/MySkillsWidget/MySkillsWidget.selector', () => {
  describe('default', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.default(state)
      // then ...
      expect(result).toEqual({ count: 0, userSkills: { ids: [], entities: {} } })
    })
    it('should return the user skills data in the expected format', () => {
      // given ...
      const state = rootStateFixture({
        userSkills: USER_SKILLS_STATE_MOCK,
      })
      // when ...
      const result = SUT.default(state)

      // then ...
      expect(result).toEqual({
        count: 8,
        userSkills: {
          ids: ['Web Design', 'Data Science', 'Presentations'],
          entities: {
            'Web Design': {
              name: 'Web Design',
              count: 1,
            },
            'Data Science': {
              name: 'Data Science',
              count: 1,
            },
            Presentations: {
              name: 'Presentations',
              count: 3,
            },
          },
        },
      })
    })
  })
})
