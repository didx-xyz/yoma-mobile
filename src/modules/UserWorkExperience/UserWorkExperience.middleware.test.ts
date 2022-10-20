import { mergeRight } from 'ramda'
import { createMiddlewareMock } from 'tests/tests.utils'

import { actions as ApiActions, utils as ApiUtils } from '~/api'
import { types as ApiUserTypes, constants as ApiUsersConstants } from '~/api/users'
import * as UserFixtures from '~/modules/User/User.fixture'
import * as UserActions from '~/modules/User/User.reducer'
import { actions as WorkExperienceActions } from '~/modules/WorkExperience'
import { WORK_EXPERIENCE_MOCK } from '~/modules/WorkExperience/WorkExperience.test.fixtures'

import {
  USER_WORK_EXPERIENCE_MOCK,
  USER_WORK_EXPERIENCE_NORMALISED_MOCK,
  userWorkExperienceStateFixture,
} from './UserWorkExperience.fixture'
import * as SUT from './UserWorkExperience.middleware'
import {
  clearUserWorkExperiencesFormValues,
  createUserWorkExperience,
  createUserWorkExperienceFailure,
  createUserWorkExperienceSuccess,
  fetchUserWorkExperienceById,
  fetchUserWorkExperienceByIdFailure,
  fetchUserWorkExperienceByIdSuccess,
  getUserWorkExperienceSuccess,
  normaliseUserWorkExperienceSuccess,
  setUserWorkExperiences,
  setUserWorkExperiencesFormValues,
  updateUserWorkExperiences,
} from './UserWorkExperience.reducer'

describe('modules/UserWorkExperience/UserWorkExperience.middleware', () => {
  describe('getUserWorkExperiencesFromCredentialsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const credentialsResponseMock = ['job1', 'job1', 'assignment1', 'job2']
      const extractDataFromPayloadMock = jest.fn()
      const extractWorkExperiencesMock = jest.fn(() => [])
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ...
      const { invoke, next } = create(
        SUT.getUserWorkExperiencesFromCredentialsFlow(extractDataFromPayloadMock, extractWorkExperiencesMock),
      )
      invoke(action)

      // then ...
      expect(extractWorkExperiencesMock).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it(' should intercept the credentials data and pass on the correct workExperience data', () => {
      // given ...credential data in an action payload
      const create = createMiddlewareMock(jest)
      const credentialsResponseMock = ['job1', 'job1', 'assignment1', 'job2']
      const jobCredentialsMock = ['job1', 'job2']
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ... we intercept the data and extract workExperience
      const extractDataFromPayloadMock = jest.fn()
      const extractWorkExperiencesMock = jest.fn(() => jobCredentialsMock)
      const { invoke, store } = create(
        // @ts-ignore - actual shape of data doesn't matter
        SUT.getUserWorkExperiencesFromCredentialsFlow(extractDataFromPayloadMock, extractWorkExperiencesMock),
      )
      invoke(action)

      // then ... we should pass on the extracted data
      expect(extractWorkExperiencesMock).toHaveBeenCalled()
      // @ts-ignore - actual shape of data doesn't matter
      expect(store.dispatch).toHaveBeenCalledWith(getUserWorkExperienceSuccess(jobCredentialsMock))
    })
  })
  describe('normaliseUserWorkExperiencesFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const jobCredentialsMock = [{ id1: 'job1' }, { id2: 'job2' }]
      const normalisedWorkExperiencesMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'job 1', id2: 'job 2' },
      }
      const normaliseMock = jest.fn(() => normalisedWorkExperiencesMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getUserWorkExperienceSuccess(jobCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store, next } = create(SUT.normaliseUserWorkExperiencesFlow({ normalise: normaliseMock }))
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should normalise and forward the job credentials', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const jobCredentialsMock = [{ id1: 'job1' }, { id2: 'job2' }]
      const normalisedWorkExperiencesMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'job 1', id2: 'job 2' },
      }
      const normaliseMock = jest.fn(() => normalisedWorkExperiencesMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getUserWorkExperienceSuccess(jobCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store } = create(SUT.normaliseUserWorkExperiencesFlow({ normalise: normaliseMock }))
      invoke(action)

      // then ...
      // @ts-ignore - data shape doesn't matter for test
      expect(store.dispatch).toHaveBeenCalledWith(normaliseUserWorkExperienceSuccess(normalisedWorkExperiencesMock))
    })
  })
  describe('setUserWorkExperiencesFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      const normalisedWorkExperiencesMock = 'NORMALISED JOBS DATA'
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseUserWorkExperienceSuccess(normalisedWorkExperiencesMock)

      // when ...
      const { invoke, store, next } = create(SUT.setUserWorkExperiencesFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should set the normalised job data', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseUserWorkExperienceSuccess('NORMALISED JOBS DATA')

      // when ... we have workExperience data to store in state
      const { invoke, store } = create(SUT.setUserWorkExperiencesFlow)
      invoke(action)

      // then ...we want to forward it with our reducer action
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      expect(store.dispatch).toHaveBeenCalledWith(setUserWorkExperiences('NORMALISED JOBS DATA'))
    })
  })
  describe('setUserWorkExperiencesFormValuesFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      const formDataMock = 'Form Data'
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = WorkExperienceActions.createWorkExperience(formDataMock)

      // when ...
      const { invoke, store, next } = create(SUT.setUserWorkExperiencesFormValuesFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should set the job form data', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      const formDataMock = {
        title: 'TITLE',
        description: 'DESCRIPTION',
        language: 'LANGUAGE',
        published: 'PUBLISHED',
        skillNames: 'SKILL_NAMES',
        organisationId: 'ORGANISATION_ID',
        startTime: 'START_TIME',
        endTime: 'END_TIME',
      }

      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = WorkExperienceActions.createWorkExperience(formDataMock)

      // when ...
      const { invoke, store } = create(SUT.setUserWorkExperiencesFormValuesFlow)
      invoke(action)

      // then ...we want to forward it with our reducer action
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      expect(store.dispatch).toHaveBeenCalledWith(
        setUserWorkExperiencesFormValues({
          type: ApiUserTypes.UserCredentialTypes.WorkExperience,
          startTime: 'START_TIME',
          endTime: 'END_TIME',
          requestVerification: false,
        }),
      )
    })
  })
  describe('createUserWorkExperienceFlow', () => {
    it('should correctly handle being called', () => {
      // given ... a user object with an id in state
      const userId = 'A USER ID'

      const mockFormValues = {
        type: ApiUserTypes.UserCredentialTypes.WorkExperience,
        startTime: 'START_TIME',
        endTime: 'END_TIME',
        requestVerification: false,
      }

      const create = createMiddlewareMock(jest, {
        user: UserFixtures.userStateFixture({ id: userId }),
        userWorkExperiences: userWorkExperienceStateFixture({ formValues: mockFormValues }),
      })
      // when ... we create the user's credentials
      const action = createUserWorkExperience(WORK_EXPERIENCE_MOCK)

      const { store, invoke, next } = create(SUT.createUserWorkExperienceFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      const userWorkExperiencesPayload = {
        ...mockFormValues,
        credentialItemId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      }
      const config = ApiUtils.prependValueToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG)(userId)

      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(config, {
            onSuccess: createUserWorkExperienceSuccess,
            onFailure: createUserWorkExperienceFailure,
          }),
          userWorkExperiencesPayload,
        ),
      )
    })
  })
  describe('createUserWorkExperienceSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const mockResponse = {
        data: { data: USER_WORK_EXPERIENCE_MOCK[0] }, //using actual data for reference
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = createUserWorkExperienceSuccess(mockResponse)

      const { store, invoke, next } = create(SUT.createUserWorkExperienceSuccessFlow)
      // when ... we respond to the createUserWorkExperienceSuccess action
      invoke(action)

      // then ...validate createUserWorkExperienceSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(fetchUserWorkExperienceById('11111-5717-4562-b3fc-2c963f66afa6'))
      expect(store.dispatch).toHaveBeenCalledWith(clearUserWorkExperiencesFormValues())
    })
  })
  describe('createUserWorkExperienceFailureFlow', () => {
    it('should correctly handle job credentials create failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = createUserWorkExperienceFailure('FAILED')
      const mockNotification = jest.fn()

      const { invoke } = create(SUT.createUserWorkExperienceFailureFlow({ notification: mockNotification }))

      // when ... we respond to the createUserWorkExperienceFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
  describe('fetchUserWorkExperienceByIdFlow', () => {
    it('should correctly handle being called', () => {
      // given ... a user object with an id in state
      const userId = 'A USER ID'

      const mockFormValues = {
        type: ApiUserTypes.UserCredentialTypes.WorkExperience,
        startTime: 'START_TIME',
        endTime: 'END_TIME',
        requestVerification: false,
      }

      const create = createMiddlewareMock(jest, {
        user: UserFixtures.userStateFixture({ id: userId }),
        userWorkExperiences: userWorkExperienceStateFixture({ formValues: mockFormValues }),
      })
      // when ... we create the user's credentials
      const action = fetchUserWorkExperienceById('ID')

      const { store, invoke, next } = create(SUT.fetchUserWorkExperienceByIdFlow)
      invoke(action)

      // then ...
      // ... we should ensure the action continues onto next
      const config = ApiUtils.prependValueToEndpointInConfig(ApiUsersConstants.USERS_CREDENTIALS_GET_BY_TYPE_CONFIG)(
        userId,
      )
      const configWithCredentialId = ApiUtils.appendValueToEndpointArrayInConfig(config)(action.payload)
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(configWithCredentialId, {
            onSuccess: fetchUserWorkExperienceByIdSuccess,
            onFailure: fetchUserWorkExperienceByIdFailure,
          }),
        ),
      )
    })
  })
  describe('fetchUserWorkExperienceByIdSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const mockNotification = jest.fn()
      const mockResponse = {
        data: { data: USER_WORK_EXPERIENCE_MOCK[0] }, //using actual data for reference
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = fetchUserWorkExperienceByIdSuccess(mockResponse)

      const { store, invoke, next } = create(
        SUT.fetchUserWorkExperienceByIdSuccessFlow({ notification: mockNotification }),
      )
      // when ... we respond to the fetchUserWorkExperienceByIdSuccess action
      invoke(action)

      // then ...validate fetchUserWorkExperienceByIdSuccess
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalledWith(updateUserWorkExperiences(USER_WORK_EXPERIENCE_NORMALISED_MOCK))
    })
  })
  describe('fetchUserWorkExperienceByIdFailureFlow', () => {
    it('should correctly handle job credentials create failure', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const action = fetchUserWorkExperienceByIdFailure('FAILED')
      const mockNotification = jest.fn()

      const { invoke } = create(SUT.fetchUserWorkExperienceByIdFailureFlow({ notification: mockNotification }))

      // when ... we respond to the fetchUserWorkExperienceByIdFailure action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
