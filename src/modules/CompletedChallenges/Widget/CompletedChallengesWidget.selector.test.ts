import { UserCredentialOpportunityTypes } from '~/api/users/users.types'
import { INITIAL_STATE } from '~/modules/UserChallenges/UserChallenges.reducer'
import { rootStateFixture } from '~/redux/redux.fixture'

import * as SUT from './CompletedChallengesWidget.selector'

describe('modules/CompletedChallenges/CompletedChallengesWidget/CompletedChallengesWidget.selector', () => {
  describe('default', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.default(state)
      // then ...
      expect(result).toEqual({ userChallenges: INITIAL_STATE, count: 0 })
    })
    it('should return the user challenges data in the expected format', () => {
      // given ...
      const state = rootStateFixture({
        userChallenges: {
          ids: [
            '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5',
            'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5',
            'XXXbdc39-cccc-4e1e-948f-5d33a2cfb3b5',
          ],
          entities: {
            '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              opportunity: {
                organisationName: 'Test Org',
                organisationLogoURL: null,
                id: '210a91ff-38b9-42f2-9b50-b6655bbf0f7c',
                title: 'Test Graph',
                description: 'Test Graph',
                url: null,
                otherData: 'OTHER DATA',
                type: UserCredentialOpportunityTypes.Impact,
              },
              approved: true,
              startDate: '2021-04-15T00:00:00',
              endDate: '2021-04-15T00:00:00',
              requestVerification: true,
              otherData: 'OTHER DATA',
            },
            'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              opportunity: {
                organisationName: 'Test Org 2',
                organisationLogoURL: null,
                id: 'XXXa91ff-38b9-42f2-9b50-b6655bbf0f7c',
                title: 'Test Graph2',
                description: 'Test Graph2',
                url: 'https://google.com',
                otherData: 'OTHER DATA',
                type: UserCredentialOpportunityTypes.Impact,
              },
              approved: false,
              startDate: '2021-04-15T00:00:00',
              endDate: '2021-04-15T00:00:00',
              requestVerification: true,
              otherData: 'OTHER DATA',
            },
            'XXXbdc39-cccc-4e1e-948f-5d33a2cfb3b5': {
              opportunity: {
                organisationName: 'Test Org 2',
                organisationLogoURL: 'https://google.com',
                id: 'XXXa91ff-38b9-42f2-9b50-b6655bbf0f7c',
                title: 'Test Graph2',
                description: 'Test Graph2',
                url: 'https://google.com',
                otherData: 'OTHER DATA',
                type: UserCredentialOpportunityTypes.Impact,
              },
              approved: false,
              startDate: '2021-04-15T00:00:00',
              requestVerification: true,
              otherData: 'OTHER DATA',
            },
          },
        },
      })
      // when ...
      const result = SUT.default(state)
      // then ...
      expect(result).toEqual({
        count: 3,
        userChallenges: {
          ids: ['88bbdc39-4146-4e1e-948f-5d33a2cfb3b5', 'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5'],
          entities: {
            '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              title: 'Test Graph',
              startDate: '2021-04-15T00:00:00',
              organisationLogoURL: null,
              isValidated: true,
            },
            'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              title: 'Test Graph2',
              startDate: '2021-04-15T00:00:00',
              organisationLogoURL: null,
              isValidated: false,
            },
          },
        },
      })
    })
  })
})
