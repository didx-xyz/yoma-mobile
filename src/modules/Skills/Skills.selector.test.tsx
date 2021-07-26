import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './Skills.selector'

describe('modules/Skills/Skills.selector', () => {
  describe('selectSkills ', () => {
    it('should return skills property of the root state', () => {
      const stateMock = rootStateFixture({
        skills: [
          {
            key: 'SOME_KEY',
            value: 'SOME_VALUE',
          },
        ],
      })
      // when ... we call the selector
      const result = SUT.selectSkills(stateMock)
      // then ... should return result as expected
      expect(result).toEqual([
        {
          key: 'SOME_KEY',
          value: 'SOME_VALUE',
        },
      ])
    })
    it('should return the default skills state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectSkills(state)
      // then ... should return result as expected
      expect(result).toEqual(state.skills)
    })
  })
})
