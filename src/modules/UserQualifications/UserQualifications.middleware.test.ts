import { createMiddlewareMock } from '../../../tests/tests.utils'
import * as UserActions from '../User/User.reducer'
import * as SUT from './UserQualifications.middleware'
import {
  getUserQualificationsSuccess,
  normaliseUserQualificationsSuccess,
  setUserQualifications,
} from './UserQualifications.reducer'

describe('modules/UserQualifications/UserQualifications.middleware', () => {
  describe('getUserQualificationsFromCredentialsFlow', () => {
    it(' should intercept the credentials data and pass on the correct qualifications data', () => {
      // given ...credential data in an action payload
      const create = createMiddlewareMock(jest)
      const credentialsResponseMock = ['qualification1', 'job1', 'assignment1', 'qualification2']
      const qualificationCredentialsMock = ['qualification1', 'qualification2']
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ... we intercept the data and extract qualifications
      const extractDataFromPayloadMock = jest.fn()
      const extractQualificationsMock = jest.fn(() => qualificationCredentialsMock)
      const { invoke, store, next } = create(
        // @ts-ignore - actual shape of data doesn't matter
        SUT.getUserQualificationsFromCredentialsFlow(extractDataFromPayloadMock, extractQualificationsMock),
      )
      invoke(action)

      // then ... we should pass on the extracted data
      expect(extractQualificationsMock).toHaveBeenCalled()
      // @ts-ignore - actual shape of data doesn't matter
      expect(store.dispatch).toHaveBeenCalledWith(getUserQualificationsSuccess(qualificationCredentialsMock))
      expect(next).toHaveBeenCalledWith(action)
    })
  })
  describe('normaliseUserQualificationsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const qualificationCredentialsMock = [{ id1: 'qualification1' }, { id2: 'qualification2' }]
      const normalisedQualificationsMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'qualification 1', id2: 'qualification 2' },
      }
      const normaliseMock = jest.fn(() => normalisedQualificationsMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getUserQualificationsSuccess(qualificationCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store, next } = create(SUT.normaliseUserQualificationsFlow({ normalise: normaliseMock }))
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should normalise and forward the qualification credentials', () => {
      // given ...
      const create = createMiddlewareMock(jest)
      const qualificationCredentialsMock = [{ id1: 'qualification1' }, { id2: 'qualification2' }]
      const normalisedQualificationsMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'qualification 1', id2: 'qualification 2' },
      }
      const normaliseMock = jest.fn(() => normalisedQualificationsMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getUserQualificationsSuccess(qualificationCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store } = create(SUT.normaliseUserQualificationsFlow({ normalise: normaliseMock }))
      invoke(action)

      // then ...
      // @ts-ignore - data shape doesn't matter for test
      expect(store.dispatch).toHaveBeenCalledWith(normaliseUserQualificationsSuccess(normalisedQualificationsMock))
    })
  })
  describe('setUserQualificationsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      const normalisedQualificationsMock = 'NORMALISED CHALLENGES DATA'
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseUserQualificationsSuccess(normalisedQualificationsMock)

      // when ...
      const { invoke, store, next } = create(SUT.setUserQualificationsFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should set the normalised qualification data', () => {
      // given ...
      const create = createMiddlewareMock(jest)

      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseUserQualificationsSuccess('NORMALISED CHALLENGES DATA')

      // when ... we have qualifications data to store in state
      const { invoke, store } = create(SUT.setUserQualificationsFlow)
      invoke(action)

      // then ...we want to forward it with our reducer action
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      expect(store.dispatch).toHaveBeenCalledWith(setUserQualifications('NORMALISED CHALLENGES DATA'))
    })
  })
})
