import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './Experience.selector'

describe('modules/Experience/Experience.selector', () => {
  describe('selector', () => {
    it('should return jobs, skills, and organisations from the root state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.default(state)
      // then ... should return result as expected
      const { jobs, skills, organisations } = result
      expect(result).toEqual({
        jobs,
        skills,
        organisations,
      })
    })
  })
})
