import { USER_RESPONSE } from './../Profile/Profile.constants'
import * as SUT from './User.utils'

describe('modules/User/User.utils', () => {
  describe('extractUserFromLoginPayload', () => {
    it('should return user data from login payload', () => {
      // given ... the auth success response
      const credentials = {
        payload: {
          data: {
            data: {
              user: USER_RESPONSE,
            },
          },
        },
      }
      // when extractUserFromLoginPayload
      const result = SUT.extractUserFromLoginPayload(credentials)
      //then expect user response data
      expect(result).toEqual(USER_RESPONSE)
    })
  })
  describe('extractUserFromUserUpdateSuccess', () => {
    it('should return user data from update payload', () => {
      // given ... the update success response
      const responseData = {
        payload: {
          data: {
            data: USER_RESPONSE,
          },
        },
      }
      // when extractUserFromLoginPayload
      const result = SUT.extractUserFromUserUpdateSuccess(responseData)
      //then expect user response data
      expect(result).toEqual(USER_RESPONSE)
    })
  })
  describe('extractUserPatchPayload', () => {
    it('should return user patch payload from user update data', () => {
      // given ...
      const userUpdateData = {
        firstName: 'FIRST_NAME',
        lastName: 'LAST_NAME',
        photoURL: 'PHOTO_URL',
        countryAlpha2: 'COUNTRY_ALPHA2',
        otherKey: 'OTHER_KEY',
      }
      const userPatchPayload = {
        firstName: 'FIRST_NAME',
        lastName: 'LAST_NAME',
        countryAlpha2: 'COUNTRY_ALPHA2',
      }
      // when extractUserPatchPayload
      const result = SUT.extractUserPatchPayload(userUpdateData)

      //then expect user patch payload be returned
      expect(result).toEqual(userPatchPayload)
    })
  })
})
