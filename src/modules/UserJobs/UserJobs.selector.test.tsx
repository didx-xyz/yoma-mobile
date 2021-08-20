import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './UserJobs.selector'

describe('modules/UserJobs/UserJobs.selector', () => {
  describe('selectUserJobs ', () => {
    it('should return userJobs property of the root state', () => {
      const userJobsStateMock = {
        ids: 'IDS',
        entities: 'ENTITIES_DATA',
        formValues: 'FORM_VALUES',
      }

      const mockState = rootStateFixture({
        userJobs: userJobsStateMock,
      })
      // when ... we call the selector
      const result = SUT.selectUserJobs(mockState)

      // then ... should return result as expected
      expect(result).toEqual(userJobsStateMock)
    })
    it('should return the default userJobs state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectUserJobs(state)

      // then ... should return result as expected
      expect(result).toEqual(state.userJobs)
    })
  })
  describe('selectFormValues ', () => {
    it('should return formValues object from the userJobs state', () => {
      const userJobsStateMock = {
        ids: 'IDS',
        entities: 'ENTITIES_DATA',
        formValues: 'FORM_VALUES',
      }

      const mockState = rootStateFixture({
        userJobs: userJobsStateMock,
      })
      // when ... we call the selector
      const result = SUT.selectFormValues(mockState)

      // then ... should return result as expected
      expect(result).toEqual('FORM_VALUES')
    })
  })
})
