import { rootStateFixture } from '../../../redux/redux.test.fixtures'
import { USER_SKILLS_STATE_MOCK } from '../../UserSkills/UserSkills.fixture'
import * as SUT from './MySkillsView.selector'

describe('modules/MySkills/MySkillsView/MySkillsView.selector', () => {
  describe('default', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.default(state)
      // then ...
      expect(result).toEqual({ userSkills: { ids: [], entities: {} } })
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
            },
            'Data Science': {
              name: 'Data Science',
            },
            Presentations: {
              name: 'Presentations',
            },
            'Machine Learning': {
              name: 'Machine Learning',
            },
            'Business Process Modeling': {
              name: 'Business Process Modeling',
            },
            'Digital Marketing': {
              name: 'Digital Marketing',
            },
            'Computer Literacy': {
              name: 'Computer Literacy',
            },
            'Mobile Application Development': {
              name: 'Mobile Application Development',
            },
          },
        },
      })
    })
  })
})
