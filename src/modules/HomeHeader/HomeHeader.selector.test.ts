import { rootStateFixture } from '../../redux/redux.fixture'
import * as SUT from './HomeHeader.selector'

describe('modules/HomeHeader/HomeHeader.selector', () => {
  describe('selector ', () => {
    it('should correctly handle an initial state', () => {
      //given ...user data
      const state = rootStateFixture()

      // when ... we call the selector
      const result = SUT.default(state)

      // then ... should return correct data for HomeHeader
      expect(result).toEqual({
        zltoBalance: 0,
        profileImageUrl: null,
      })
    })
    it('should select props as expected when available in state', () => {
      //given ...user data
      const state = rootStateFixture({
        user: {
          firstName: 'FIRST_NAME',
          lastName: 'LAST_NAME',
          phoneNumber: 'PHONE_NUMBER',
          countryAlpha2: 'COUNTRY_ALPHA_2',
          email: 'EMAIL',
          photoURL: 'PHOTO_URL',
          zltoBalance: 250,
        },
      })
      // when ... we call the selector
      const result = SUT.default(state)

      // then ... should return result as expected
      expect(result).toEqual({
        profileImageUrl: 'PHOTO_URL',
        zltoBalance: 250,
      })
    })
  })
})
