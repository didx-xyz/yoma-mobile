import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './Qualifications.selector'

describe('modules/Qualifications/Qualifications.selector', () => {
  describe('selectQualifications ', () => {
    it('should return qualifications property of the root state', () => {
      const stateMock = rootStateFixture({
        qualifications: [
          {
            key: 'SOME_KEY',
            value: 'SOME_VALUE',
          },
        ],
      })
      // when ... we call the selector
      const result = SUT.selectQualifications(stateMock)
      // then ... should return result as expected
      expect(result).toEqual([
        {
          key: 'SOME_KEY',
          value: 'SOME_VALUE',
        },
      ])
    })
    it('should return the default qualifications state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectQualifications(state)
      // then ... should return result as expected
      expect(result).toEqual(state.qualifications)
    })
  })
})
