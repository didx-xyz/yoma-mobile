import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './Experience.selector'

describe('modules/Qualifications/Qualifications.selector', () => {
  describe('selector', () => {
    it('should return qualifications, skills, and organisations from the root state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.default(state)
      // then ... should return result as expected
      const { qualifications, skills, organisations } = state
      expect(result).toEqual({
        qualifications,
        skills,
        organisations,
      })
    })
  })
})
