import { USER_SKILLS_STATE_MOCK } from '~/modules/UserSkills/UserSkills.fixture'
import { rootStateFixture } from '~/redux/redux.fixture'

import * as SUT from './MySkillsView.selector'

describe('modules/MySkills/MySkillsView/MySkillsView.selector', () => {
  describe('default', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.default(state)
      // then ...
      expect(result).toEqual({ userSkills: { ids: [], entities: {} }, count: 0 })
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
          ids: [
            'Web Design',
            'Data Science',
            'Presentations',
            'Machine Learning',
            'Business Process Modeling',
            'Digital Marketing',
            'Computer Literacy',
            'Mobile Application Development',
          ],
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
            'Machine Learning': {
              name: 'Machine Learning',
              count: 1,
            },
            'Business Process Modeling': {
              name: 'Business Process Modeling',
              count: 1,
            },
            'Digital Marketing': {
              name: 'Digital Marketing',
              count: 1,
            },
            'Computer Literacy': {
              name: 'Computer Literacy',
              count: 1,
            },
            'Mobile Application Development': {
              name: 'Mobile Application Development',
              count: 1,
            },
          },
        },
      })
    })
  })
})
