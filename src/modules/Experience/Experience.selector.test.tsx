import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './Experience.selector'

describe('modules/Experience/Experience.selector', () => {
  describe('selector', () => {
    it('should return organisations from the root state', () => {
      const state = rootStateFixture({
        organisations: [
          {
            key: 'A KEY',
            value: 'SOME VALUE',
          },
        ],
      })
      // when ... we call the selector
      const result = SUT.default(state)
      // then ... should return result as expected
      expect(result.organisations).toEqual([
        {
          key: 'A KEY',
          value: 'SOME VALUE',
        },
      ])
    })
  })
})
