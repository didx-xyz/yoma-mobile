import { rootStateFixture } from '../../../redux/redux.test.fixtures'
import { INITIAL_STATE } from '../UserChallenges.reducer'
import * as SUT from './UserChallengesWidget.selector'

describe('modules/UserChallenges/UserChallengesWidget/UserChallengesWidget.selector', () => {
  describe('default', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.default(state)
      // then ...
      expect(result).toEqual({ challenges: INITIAL_STATE })
    })
    it('should return the user challenges data in the expected format', () => {
      // given ...
      const state = rootStateFixture({
        userChallenges: {
          ids: [
            '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5',
            'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5',
            ,
            'XXXbdc39-cccc-4e1e-948f-5d33a2cfb3b5',
          ],
          entities: {
            '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              challenge: {
                organisationId: '7f9df1bc-10b8-445c-0b4a-08d81d3203ed',
                organisationName: 'Test Org',
                organisationLogoURL: null,
                id: '210a91ff-38b9-42f2-9b50-b6655bbf0f7c',
                name: 'Test Graph',
                description: 'Test Graph',
                url: null,
                createdAt: '2021-02-01T00:00:00',
                zltoReward: 250,
                createdByAdmin: true,
                language: 'EN',
                startTime: '2021-02-01T00:00:00',
                endTime: null,
                published: true,
              },
              id: '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5',
              verifiedAt: '2021-05-02T00:00:00',
              approved: true,
              approvalMessage: null,
              startDate: '2021-04-15T00:00:00',
              endDate: '2021-04-15T00:00:00',
              createdAt: '2021-05-21T00:00:00',
              fileId: null,
              fileURL: null,
              requestVerification: true,
            },
            'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              challenge: {
                organisationId: 'XXXdf1bc-10b8-445c-0b4a-08d81d3203ed',
                organisationName: 'Test Org 2',
                organisationLogoURL: null,
                id: 'XXXa91ff-38b9-42f2-9b50-b6655bbf0f7c',
                name: 'Test Graph2',
                description: 'Test Graph2',
                url: 'https://google.com',
                createdAt: '2021-02-01T00:00:00',
                zltoReward: 250,
                createdByAdmin: true,
                language: 'EN',
                startTime: '2021-02-01T00:00:00',
                endTime: null,
                published: true,
              },
              id: 'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5',
              verifiedAt: '2021-05-02T00:00:00',
              approved: false,
              approvalMessage: null,
              startDate: '2021-04-15T00:00:00',
              endDate: '2021-04-15T00:00:00',
              createdAt: '2021-05-21T00:00:00',
              fileId: null,
              fileURL: null,
              requestVerification: true,
            },
            'XXXbdc39-cccc-4e1e-948f-5d33a2cfb3b5': {
              challenge: {
                organisationId: 'XXXdf1bc-10b8-445c-0b4a-08d81d3203ed',
                organisationName: 'Test Org 2',
                organisationLogoURL: null,
                id: 'XXXa91ff-38b9-42f2-9b50-b6655bbf0f7c',
                name: 'Test Graph2',
                description: 'Test Graph2',
                url: 'https://google.com',
                createdAt: '2021-02-01T00:00:00',
                zltoReward: 250,
                createdByAdmin: true,
                language: 'EN',
                startTime: '2021-02-01T00:00:00',
                endTime: null,
                published: true,
              },
              id: 'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5',
              verifiedAt: '2021-05-02T00:00:00',
              approved: false,
              approvalMessage: null,
              startDate: '2021-04-15T00:00:00',
              endDate: '2021-04-15T00:00:00',
              createdAt: '2021-05-21T00:00:00',
              fileId: null,
              fileURL: null,
              requestVerification: true,
            },
          },
        },
      })
      // when ...
      const result = SUT.default(state)
      // then ...
      expect(result).toEqual({
        challenges: {
          ids: ['88bbdc39-4146-4e1e-948f-5d33a2cfb3b5', 'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5'],
          entities: {
            '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              name: 'Test Graph',
              startDate: '2021-04-15T00:00:00',
              avatarUrl: null,
              isValidated: true,
            },
            'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              name: 'Test Graph2',
              startDate: '2021-04-15T00:00:00',
              avatarUrl: 'https://google.com',
              isValidated: false,
            },
          },
        },
      })
    })
  })
})
