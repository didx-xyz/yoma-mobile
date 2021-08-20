import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './UserJobs.selector'

describe('modules/UserJobs/UserJobs.selector', () => {
  describe('selector', () => {
    it('should return skills, and organisations from the root state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.default(state)
      // then ... should return result as expected
      const { skills, organisations } = result
      expect(result).toEqual({
        skills,
        organisations,
      })
    })
  })
})
