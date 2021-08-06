import { mergeRight } from 'ramda'
import { rootStateFixture } from 'redux/redux.test.fixtures'

import { createMiddlewareStub } from '../../../tests/tests.utils'
import { actions as ApiActions } from '../../api'
import { constants as ApiOrganisationsConstants } from '../../api/organisations'
import * as SUT from './Organisations.middleware'
import {
  fetchOrganisations,
  fetchOrganisationsFailure,
  fetchOrganisationsSuccess,
  setOrganisations,
} from './Organisations.reducer'
import { extractOrganisationsFromPayload } from './Organisations.utils'

describe('modules/Organisations/Organisations.middleware', () => {
  describe('fetchOrganisationsFlow', () => {
    it('should correctly handle being called', () => {
      // given ...
      const mockState = rootStateFixture({})

      const create = createMiddlewareStub(jest, mockState)
      const action = fetchOrganisations()
      // @ts-ignore
      const { invoke, next } = create(SUT.fetchOrganisationsFlow)

      // when ... we respond to the fetchOrganisations action
      invoke(action)

      // then ...validate fetchOrganisationsFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly handle fetching the organisations via the API', () => {
      // given ...
      const mockState = rootStateFixture({})

      const create = createMiddlewareStub(jest, mockState)
      const action = fetchOrganisations()
      // @ts-ignore
      const { invoke, store } = create(SUT.fetchOrganisationsFlow)
      // when ... we respond to the updateOrganisations action
      invoke(action)

      // then ...validate fetchOrganisationsFlow
      expect(store.dispatch).toHaveBeenCalledWith(
        ApiActions.apiRequest(
          mergeRight(ApiOrganisationsConstants.ORGANISATIONS_GET_KEY_NAMES_CONFIG, {
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
      const mockResponseData = [
        {
          key: 'SOME_KEY',
          value: 'SOME_VALUE',
        },
      ]

      const action = fetchOrganisationsSuccess(mockResponseData)
      // @ts-ignore
      const { invoke, next } = create(SUT.fetchOrganisationsSuccessFlow)
      // when ... we respond to the fetchOrganisationsSuccess action
      invoke(action)
      // then ...validate fetchOrganisationsSuccessFlow
      expect(next).toHaveBeenCalledWith(action)
    })
    it('should correctly set organisations on successful fetch', () => {
      // given ...
      const create = createMiddlewareStub(jest)
      const mockResponseData = {
        data: [
          {
            key: 'SOME_KEY',
            value: 'SOME_VALUE',
          },
        ],
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
      const organisation = extractOrganisationsFromPayload(action)
      expect(store.dispatch).toHaveBeenCalledWith(setOrganisations(organisation))
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

      // when ... we respond to the fetchOrganisationsFailures action
      invoke(action)

      // then ...validate failure
      expect(mockNotification).toHaveBeenCalled()
    })
  })
})
