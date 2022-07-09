import { rootStateFixture } from '~/redux/redux.fixture'

import * as SUT from './UserJobs.selector'

describe('modules/UserJobs/UserJobs.selector', () => {
  describe('selectUserJobs ', () => {
    it('should return UserJobs property of the root state', () => {
      const stateMock = rootStateFixture({
        userJobs: 'UserJobs Object',
      })
      // when ... we call the selector
      // @ts-ignore
      const result = SUT.selectUserJobs(stateMock)

      // then ... should return result as expected
      expect(result).toEqual('UserJobs Object')
    })
    it('should return the default UserJobs state', () => {
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
