import { mergeRight } from 'ramda'
import { rootStateFixture } from 'redux/redux.test.fixtures'
import { extractDataFromPayload } from 'utils/redux.utils'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiOrganisationsConstants } from '../../api/organisations'
import * as SUT from './Organisations.middleware'
import {
  fetchOrganisations,
  fetchOrganisationsFailure,
  fetchOrganisationsSuccess,
  getOrganisationsSuccess,
  normaliseOrganisationsSuccess,
  setOrganisations,
} from './Organisations.reducer'
import { SKILLS_MOCK } from './Organisations.test.fixtures'

describe('modules/Organisations/Organisations.middleware', () => {
  describe('fetchOrganisationsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = fetchOrganisations()
      // @ts-ignore
      const { invoke, next } = create(SUT.fetchOrganisationsFlow)

      // when ... we respond to the fetchOrganisations action
      invoke(action)

      // then ...validate fetchOrganisationsFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle updating the organisations state', () => {
      // given ...
      const mockState = rootStateFixture()

      const create = createMiddlewareStub(jest, mockState)
      const action = fetchOrganisations()
      // @ts-ignore
      const { invoke, store } = create(SUT.fetchOrganisationsFlow)
      // when ... we respond to the fetchOrganisations action
      invoke(action)

      // then ...validate fetchOrganisationsFlow
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiOrganisationsConstants.SKILLS_GET_KEY_NAMES_CONFIG, {
            onSuccess: fetchOrganisationsSuccess,
            onFailure: fetchOrganisationsFailure,
          }),
        ),
      )
    })
  })
  describe('fetchOrganisationsSuccessFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockResponseData = {
        data: {
          data: SKILLS_MOCK,
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = fetchOrganisationsSuccess(mockResponseData)
      // @ts-ignore
      const { invoke, next } = create(SUT.fetchOrganisationsSuccessFlow)
      // when ... we respond to the fetchOrganisationsSuccess action
      invoke(action)

      // then ...validate fetchOrganisationsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly add organisations to state on successful fetch', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockResponseData = {
        data: {
          data: SKILLS_MOCK,
        },
        meta: {
          success: true,
          code: 200,
          message: null,
        },
      }

      const action = fetchOrganisationsSuccess(mockResponseData)
      // @ts-ignore
      const { store, invoke } = create(SUT.fetchOrganisationsSuccessFlow)
      // when ... we respond to the fetchOrganisationsSuccess action
      invoke(action)
      // then ...validate setOrganisations

      const data = extractDataFromPayload(action)
      expect(store.dispatch).toHaveBeenCalledWith(getOrganisationsSuccess(data))
    })
  })
  describe('normaliseOrganisationsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const organisationCredentialsMock = [{ id1: 'organisation1' }, { id2: 'organisation2' }]
      const normalisedChallengesMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'organisation 1', id2: 'organisation 2' },
      }
      const normaliseMock = jest.fn(() => normalisedChallengesMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getOrganisationsSuccess(organisationCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store, next } = create(SUT.normaliseOrganisationsFlow(normaliseMock))
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should normalise and forward the organisation credentials', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const organisationCredentialsMock = [{ id1: 'organisation1' }, { id2: 'organisation2' }]
      const normalisedChallengesMock = {
        ids: ['id1', 'id2'],
        entries: { id1: 'organisation 1', id2: 'organisation 2' },
      }
      const normaliseMock = jest.fn(() => normalisedChallengesMock)
      // @ts-ignore - data shape doesn't matter for test
      const action = getOrganisationsSuccess(organisationCredentialsMock)

      // when ...
      // @ts-ignore - data shape doesn't matter for test
      const { invoke, store } = create(SUT.normaliseOrganisationsFlow(normaliseMock))
      invoke(action)

      // then ...
      // @ts-ignore - data shape doesn't matter for test
      expect(store.dispatch).toHaveBeenCalledWith(normaliseOrganisationsSuccess(normalisedChallengesMock))
    })
  })
  describe('setOrganisationsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const create = createMiddlewareStub(jest)

      const normalisedChallengesMock = 'NORMALISED SKILLS DATA'
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseOrganisationsSuccess(normalisedChallengesMock)

      // when ...
      const { invoke, store, next } = create(SUT.setOrganisationsFlow)
      invoke(action)

      // then ...
      expect(store.dispatch).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should set the normalised organisation data', () => {
      // given ...
      const create = createMiddlewareStub(jest)

      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      const action = normaliseOrganisationsSuccess('NORMALISED SKILLS DATA')

      // when ... we have organisations data to store in state
      const { invoke, store } = create(SUT.setOrganisationsFlow)
      invoke(action)

      // then ...we want to forward it with our reducer action
      // @ts-ignore - ignoring data that's not 100% correct, as it's immaterial to this test
      expect(store.dispatch).toHaveBeenCalledWith(setOrganisations('NORMALISED SKILLS DATA'))
    })
  })
  describe('fetchOrganisationsFailureFlow', () => {
    it('should correctly handle organisations fetch failure', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const action = fetchOrganisationsFailure('FAILED')
      const mockNotification = jest.fn()
      // @ts-ignore
      const { invoke } = create(SUT.fetchOrganisationsFailureFlow({ notification: mockNotification }))

      // when ... we respond to the fetchOrganisationsFailure action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
