import { createMiddlewareStub } from '../../../tests/tests.utils'
import * as UserActions from '../User/User.reducer'
import * as SUT from './UserJobs.middleware'
import { getUserJobsSuccess, normaliseUserJobsSuccess, setUserJobs } from './UserJobs.reducer'

describe('modules/UserJobs/UserJobs.middleware', () => {
  describe('getUserJobsFromCredentialsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const credentialsResponseMock = ['job1', 'job1', 'assignment1', 'job2']
      const extractDataFromPayloadMock = jest.fn()
      const extractJobsMock = jest.fn()
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ...
      const { invoke, next } = create(SUT.getUserJobsFromCredentialsFlow(extractDataFromPayloadMock, extractJobsMock))
      invoke(action)

      // then ...
      expect(extractJobsMock).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it(' should intercept the credentials data and pass on the correct jobs data', () => {
      // given ...credential data in an action payload
      const create = createMiddlewareStub(jest)
      const credentialsResponseMock = ['job1', 'job1', 'assignment1', 'job2']
      const jobCredentialsMock = ['job1', 'job2']
      const action = UserActions.fetchUserCredentialsSuccess(credentialsResponseMock)

      // when ... we intercept the data and extract jobs
      const extractDataFromPayloadMock = jest.fn()
      const extractJobsMock = jest.fn(() => jobCredentialsMock)
      const { invoke, store } = create(
        // @ts-ignore - actual shape of data doesn't matter
        SUT.getUserJobsFromCredentialsFlow(extractDataFromPayloadMock, extractJobsMock),
      )
      invoke(action)

      // then ... we should pass on the extracted data
      expect(extractJobsMock).toHaveBeenCalled()
      // @ts-ignore - actual shape of data doesn't matter
      expect(store.dispatch).toHaveBeenCalledWith(getUserJobsSuccess(jobCredentialsMock))
    })
  })
  describe('normaliseUserJobsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const jobCredentialsMock = [{ id1: 'job1' }, { id2: 'job2' }]
      const normalisedJobsMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'job 1', id2: 'job 2' },
      }
      const normaliseMock = jest.fn(() => normalisedJobsMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getUserJobsSuccess(jobCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store, next } = create(SUT.normaliseUserJobsFlow(normaliseMock))
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should normalise and forward the job credentials', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const jobCredentialsMock = [{ id1: 'job1' }, { id2: 'job2' }]
      const normalisedJobsMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'job 1', id2: 'job 2' },
      }
      const normaliseMock = jest.fn(() => normalisedJobsMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getUserJobsSuccess(jobCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store } = create(SUT.normaliseUserJobsFlow(normaliseMock))
      invoke(action)

      // then ...
      // @ts-ignore - data shape doesn't matter for test
      expect(store.dispatch).toHaveBeenCalledWith(normaliseUserJobsSuccess(normalisedJobsMock))
    })
  })
  describe('setUserJobsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)

      const normalisedJobsMock = 'NORMALISED JOBS DATA'
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseUserJobsSuccess(normalisedJobsMock)

      // when ...
      const { invoke, store, next } = create(SUT.setUserJobsFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should set the normalised job data', () => {
      // given ...
      const create = createMiddlewareStub(jest)

      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseUserJobsSuccess('NORMALISED JOBS DATA')

      // when ... we have jobs data to store in state
      const { invoke, store } = create(SUT.setUserJobsFlow)
      invoke(action)

      // then ...we want to forward it with our reducer action
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      expect(store.dispatch).toHaveBeenCalledWith(setUserJobs('NORMALISED JOBS DATA'))
    })
  })
})
