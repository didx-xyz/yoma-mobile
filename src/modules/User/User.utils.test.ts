import { USER_RESPONSE } from './User.test.fixtures'
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
  describe('extractUserfromUpdateUserPayload', () => {
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
      // when extractUserfromUpdateUserPayload
      const result = SUT.extractUserfromUpdateUserPayload(userUpdateData)

      //then expect user patch payload be returned
      expect(result).toEqual(userPatchPayload)
    })
  })
  describe('createPhotoFormPayload', () => {
    it('should correctly return user photo form data', () => {
      // given ... image data
      const capturedProfileImage = {
        filename: 'IMAGE_NAME',
        mime: 'TYPE',
        path: 'IMAGE_PATH',
      }

      const FormDataMock = function (this: any) {
        this.formData = 'FORM_DATA'
        this.append = jest.fn()
        return this.formData
      } as any

      const photoUploadFormConfig = {
        formName: 'NAME',
        formInstance: new FormDataMock(),
      }
      // when createPhotoFormPayload
      const result = SUT.createPhotoFormPayload(capturedProfileImage, photoUploadFormConfig)
      //then expect photo form data
      expect(result.formData).toBe('FORM_DATA')
    })
  })
})
