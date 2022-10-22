import { rootStateFixture } from '~/redux/redux.fixture'

import * as SUT from './WorkExperienceForm.selector'

describe('modules/WorkExperience/WorkExperience.selector', () => {
  describe('default selector', () => {
    it('should handle an empty state', () => {
      const stateMock = rootStateFixture()
      // when ... we call the selector
      // @ts-ignore
      const result = SUT.default(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        organisations: [],
      })
    })
    it('should return userJobs, skills and organisations lists', () => {
      const mockState = rootStateFixture({
        organisations: {
          ids: ['key1'],
          entities: { key1: { key: 'key1', value: 'organisation' } },
        },
      })
      // when ... we call the selector
      const result = SUT.default(mockState) // no idea why it expects state to be never...

      // then ... should return the data required by the experience view
      expect(result).toEqual({
        organisations: [{ label: 'organisation', value: 'key1' }],
      })
    })
  })
})
