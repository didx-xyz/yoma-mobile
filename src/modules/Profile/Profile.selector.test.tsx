import { INITIAL_STATE as AUTH_INITIAL_STATE } from 'modules/Auth/Auth.reducer'
import { INITIAL_STATE as USER_INITIAL_STATE } from 'modules/User/User.reducer'

import * as SUT from './Profile.selector'

describe('modules/Profile/Profile.selector', () => {
  describe('selector ', () => {
    it('should select props as expected when available in state', () => {
      //given ...user data
      const state = {
        auth: AUTH_INITIAL_STATE,
        user: {
          ...USER_INITIAL_STATE,
          firstName: 'FIRST_NAME',
          lastName: 'LAST_NAME',
          phoneNumber: 'PHONE_NUMBER',
          countryAlpha2: 'COUNTRY_ALPHA_2',
          email: 'EMAIL',
          photoURL: 'PHOTO_URL',
        },
      }
      // when ... we call the selector
      const result = SUT.default(state)

      // then ... should return result as expected
      expect(result).toEqual({
        user: {
          firstName: 'FIRST_NAME',
          lastName: 'LAST_NAME',
          phoneNumber: 'PHONE_NUMBER',
          countryAlpha2: 'COUNTRY_ALPHA_2',
          email: 'EMAIL',
          photoURL: 'PHOTO_URL',
        },
      })
    })
  })
})
