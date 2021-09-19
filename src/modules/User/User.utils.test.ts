import { UserCredentialTypes } from '../../api/users/users.types'
import { USER_RESPONSE } from './User.fixture'
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
  describe('extractUserFromUpdateUserPayload', () => {
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
      // when extractUserFromUpdateUserPayload
      const result = SUT.extractUserFromUpdateUserPayload(userUpdateData)

      //then expect user patch payload be returned
      expect(result).toEqual(userPatchPayload)
    })
  })
  describe('createPhotoFormPayload', () => {
    it('should correctly return user photo form data', () => {
      // given ... image data
      const capturedProfileImageStub = {
        filename: 'IMAGE_NAME',
        mime: 'TYPE',
        path: 'IMAGE_PATH',
      }

      const FormInstanceMock = () => ({ formData: 'FORM_DATA', append: jest.fn() })

      // when createPhotoFormPayload
      const result = SUT.createPhotoFormPayload(FormInstanceMock)(capturedProfileImageStub)
      //then expect photo form data
      expect(result.formData).toBe('FORM_DATA')
    })
  })
  describe('prepareUserCredentialItemPayload', () => {
    it('should return merged credential id with form values from state', () => {
      // given ...
      const mockPayload = {
        payload: {
          id: 'ID',
          other: 'OTHER',
        },
      }
      const mockFormValues = {
        type: UserCredentialTypes.Job,
        requestVerification: false,
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      }

      // when ... we want to extract the data from the rest of the payload
      const result = SUT.prepareUserCredentialItemPayload(mockPayload)(mockFormValues)

      // then ... the data should be extracted correctly
      expect(result).toEqual({
        type: UserCredentialTypes.Job,
        credentialItemId: 'ID',
        requestVerification: false,
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      })
    })
  })
  describe('extractCredential', () => {
    it.each([
      [
        UserCredentialTypes.Challenge,
        [
          { challenge: 'CHALLENGE DATA 1', meta: 'META' },
          { challenge: 'CHALLENGE DATA 2', meta: 'META' },
        ],
      ],
      [
        UserCredentialTypes.Job,
        [
          { job: 'JOB DATA 1', meta: 'META' },
          { job: 'JOB DATA 2', meta: 'META' },
        ],
      ],
      [
        UserCredentialTypes.Assignment,
        [
          { assignment: 'ASSIGNMENT DATA 1', meta: 'META' },
          { assignment: 'ASSIGNMENT DATA 2', meta: 'META' },
        ],
      ],
      [UserCredentialTypes.Qualification, [{ qualification: 'QUALIFICATION DATA 1', meta: 'META' }]],
    ])('should correctly extract all of a given credential type from a list of credentials', (type, expected) => {
      // given ... an array of all credential data for a user
      const credentialsMock = [
        { qualification: 'QUALIFICATION DATA 1', meta: 'META' },
        { assignment: 'ASSIGNMENT DATA 1', meta: 'META' },
        { job: 'JOB DATA 1', meta: 'META' },
        { challenge: 'CHALLENGE DATA 1', meta: 'META' },
        { job: 'JOB DATA 2', meta: 'META' },
        { assignment: 'ASSIGNMENT DATA 2', meta: 'META' },
        { challenge: 'CHALLENGE DATA 2', meta: 'META' },
      ]

      // when we want to get all the credentials of a given type
      const result = SUT.extractCredentialsByType(type)(credentialsMock)

      //then expect that we have a list of challenge credentials
      expect(result).toEqual(expected)
    })
  })
  describe('extractUserCredentialFormValues', () => {
    it('should return the jobs credentials form values from state', () => {
      // given ... an object in the shape of the successful response
      const mockPayload = {
        id: 'ID',
        title: 'TITLE',
        description: 'DESCRIPTION',
        organisationId: 'ORGANISATION_ID',
        skillNames: ['SKILL'],
        startTime: 'MOCK_DATE',
        endTime: 'MOCK_DATE',
      }
      // when ... we want to extract the data from the rest of the payload
      const result = SUT.extractUserCredentialFormValues(UserCredentialTypes.Job)(mockPayload)

      // then ... the data should be extracted correctly
      expect(result).toEqual({
        type: UserCredentialTypes.Job,
        requestVerification: false,
        startTime: 'MOCK_DATE',
        endTime: 'MOCK_DATE',
      })
    })
  })
  describe('prepareCreateUserCredentialPayload', () => {
    it('should correctly format the data payload for the create credential api call', () => {
      // given
      const actionPayload = {
        challengeId: 'CHALLENGE ID',
        startDate: '2020-09-09T22:00:00.000Z',
        endDate: '2020-10-09T22:00:00.000Z',
        requestVerification: false,
      }

      // when we prepare the payload
      const result = SUT.prepareCreateUserCredentialPayload(UserCredentialTypes.Challenge)(actionPayload)

      // then we should have a correctly formatted payload
      expect(result).toEqual({
        type: UserCredentialTypes.Challenge,
        credentialItemId: 'CHALLENGE ID',
        startTime: '2020-09-09T22:00:00.000Z',
        endTime: '2020-10-09T22:00:00.000Z',
        requestVerification: false,
      })
    })
  })
  describe('updateStateWithFormValues', () => {
    it('should extract the data from a typical response payload', () => {
      // given ...
      const state = {
        ids: 'Normalised Ids array',
        entities: 'Normalised Entities Object',
      }

      const formValues = 'Temporary Form Object'

      // when ... we updateStateWithFormValues
      // @ts-ignore
      const result = SUT.updateStateWithFormValues(state, formValues)

      // then ...
      expect(result).toEqual({
        ids: 'Normalised Ids array',
        entities: 'Normalised Entities Object',
        formValues: 'Temporary Form Object',
      })
    })
  })
})
