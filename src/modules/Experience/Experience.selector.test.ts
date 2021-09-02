import { rootStateFixture } from '../../redux/redux.test.fixtures'
import * as SUT from './Experience.selector'

describe('modules/Experience/Experience.selector', () => {
  describe('default selector', () => {
    it('should return an empty array by default', () => {
      const stateMock = rootStateFixture()
      // when ... we call the selector
      // @ts-ignore
      const result = SUT.default(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        userJobs: [],
        skills: [],
        organisations: [],
      })
    })
    it('should return userJobs, skills and organisations lists', () => {
      const mockState = rootStateFixture({
        userJobs: {
          ids: ['id1'],
          entities: { id1: { job: 'Job Data', startDate: 'Start Data', endDate: 'End Date' } },
        },
        skills: {
          ids: ['key1'],
          entities: { key1: { key: 'key1', value: 'skill' } },
        },
        organisations: {
          ids: ['key1'],
          entities: { key1: { key: 'key1', value: 'organisation' } },
        },
      })
      // when ... we call the selector
      const result = SUT.default(mockState)

      // then ... should return the data required by the experience view
      expect(result).toEqual({
        userJobs: [{ job: 'Job Data', startDate: 'Start Data', endDate: 'End Date' }],
        organisations: [{ label: 'organisation', value: 'key1' }],
        skills: [{ label: 'skill', value: 'skill' }],
      })
    })
  })
})
