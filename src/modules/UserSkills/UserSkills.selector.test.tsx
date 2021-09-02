import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './UserSkills.selector'

describe('modules/UserSkills/UserSkills.selector', () => {
  describe('selectUserSkills ', () => {
    it('should return the default userSkills state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectUserSkills(state)

      // then ... should return result as expected
      expect(result).toEqual(state.userSkills)
    })
    it('should return userSkills property of the root state', () => {
      const mockState = rootStateFixture({
        userSkills: {
          ids: ['skill1', 'skill2'],
          entities: {
            skill1: 'SKILL 1',
            skill2: 'SKILL 2',
          },
        },
      })
      // when ... we call the selector
      const result = SUT.selectUserSkills(mockState)

      // then ... should return result as expected
      expect(result).toEqual({
        ids: ['skill1', 'skill2'],
        entities: {
          skill1: 'SKILL 1',
          skill2: 'SKILL 2',
        },
      })
    })
  })
})
