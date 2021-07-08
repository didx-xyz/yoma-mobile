import { rootStateFixture } from '../../redux/redux.test.fixtures'
import { INITIAL_STATE } from '../User/User.reducer'
import { USER_RESPONSE } from './../Profile/Profile.constants'
import * as SUT from './User.selector'
import { selectUserId } from './User.selector'

describe('modules/User/User.selector', () => {
  describe('selectUser ', () => {
    it('should return user property of the root state', () => {
      const stateMock = rootStateFixture({
        user: USER_RESPONSE,
      })
      // when ... we call the selector
      const result = SUT.selectUser(stateMock)
      // then ... should return result as expected
      expect(result).toEqual(stateMock.user)
    })
    it('should return the default user state', () => {
      const stateMock = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectUser(stateMock)
      // then ... should return result as expected
      expect(result).toEqual(stateMock.user)
    })
  })
  describe('selectUserId ', () => {
    it('should return the default value for the id if none exists', () => {
      // given ... no user data available
      const stateMock = rootStateFixture()
      // when ... we get the user's id
      const result = SUT.selectUserId(stateMock)
      // then ... should return an empty string
      expect(result).toBe('')
    })
    it('should return user property of the root state', () => {
      // given ... a valid user
      const stateMock = rootStateFixture({
        user: { ...USER_RESPONSE, id: 'A USER ID' },
      })
      // when ... we get the user's id
      const result = SUT.selectUserId(stateMock)
      // then ... we should the user's id returned
      expect(result).toBe('A USER ID')
    })
  })
})
