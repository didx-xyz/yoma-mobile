import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './UserSkills.selector'
import { USER_SKILLS_MOCK } from './UserSkills.test.fixtures'

describe('modules/UserSkills/UserSkills.selector', () => {
  describe('selectUserSkills ', () => {
    it('should return userSkills property of the root state', () => {
      const mockState = rootStateFixture({
        userSkills: USER_SKILLS_MOCK,
      })
      // when ... we call the selector
      const result = SUT.selectUserSkills(mockState)

      // then ... should return result as expected
      expect(result).toEqual(USER_SKILLS_MOCK)
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
