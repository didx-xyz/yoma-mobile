import { SKILLS_STATE_MOCK } from 'modules/Skills/Skills.test.fixtures'
import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './Experience.selector'

describe('modules/Experience/Experience.selector', () => {
  describe('selector', () => {
    it('should return skills from the root state', () => {
      //given...
      const mockFiltered = ['VALUE', 'VALUE1']
      const state = rootStateFixture({
        skills: {
          ...SKILLS_STATE_MOCK,
          filtered: mockFiltered,
        },
      })

      // when ... we call the selector
      const result = SUT.default(state)

      // then ... should return filtered skills
      const { skills } = result
      expect(skills).toEqual(mockFiltered)
    })
  })
})
