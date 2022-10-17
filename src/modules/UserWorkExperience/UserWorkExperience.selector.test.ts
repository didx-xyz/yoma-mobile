import { rootStateFixture } from '~/redux/redux.fixture'

import * as SUT from './UserWorkExperience.selector'

describe('modules/UserWorkExperience/UserWorkExperience.selector', () => {
  describe('selectUserWorkExperiences ', () => {
    it('should return UserWorkExperience property of the root state', () => {
      const stateMock = rootStateFixture({
        userWorkExperiences: 'UserWorkExperience Object',
      })
      // when ... we call the selector
      // @ts-ignore
      const result = SUT.selectUserWorkExperiences(stateMock)

      // then ... should return result as expected
      expect(result).toEqual('UserWorkExperience Object')
    })
    it('should return the default UserWorkExperience state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectUserWorkExperiences(state)

      // then ... should return result as expected
      expect(result).toEqual(state.userJobs)
    })
  })
  describe('selectFormValues', () => {
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
