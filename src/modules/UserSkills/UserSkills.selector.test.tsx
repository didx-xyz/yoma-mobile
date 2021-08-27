import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './UserSkills.selector'

describe('modules/UserSkills/UserSkills.selector', () => {
  describe('selectUserSkills ', () => {
    it('should return userSkills property of the root state', () => {
      const userSkillsStateMock = {}

      const mockState = rootStateFixture({
        userSkills: userSkillsStateMock,
      })
      // when ... we call the selector
      const result = SUT.selectUserSkills(mockState)

      // then ... should return result as expected
      expect(result).toEqual(userSkillsStateMock)
    })
    it('should return the default userSkills state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectUserSkills(state)

      // then ... should return result as expected
      expect(result).toEqual(state.userSkills)
    })
  })
})
