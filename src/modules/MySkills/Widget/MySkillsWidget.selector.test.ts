import { rootStateFixture } from '../../../redux/redux.test.fixtures'
import * as SUT from './MySkillsWidget.selector'

describe('modules/MySkills/MySkillsWidget/MySkillsWidget.selector', () => {
  describe('default', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.default(state)
      // then ...
      expect(result).toEqual({ count: 0, userSkills: { ids: [], entities: {} } })
    })
    it('should return the user jobs data in the expected format', () => {
      // given ...
      const state = rootStateFixture({
        userSkills: {
          ids: [
            '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5',
            'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5',
            'XXXbdc39-cccc-4e1e-948f-5d33a2cfb3b5',
          ],
          entities: {
            '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              job: {
                organisationName: 'Test Org',
                organisationLogoURL: null,
                id: '210a91ff-38b9-42f2-9b50-b6655bbf0f7c',
                title: 'Test Graph',
                description: 'Test Graph',
                url: null,
                otherData: 'OTHER DATA',
              },
              approved: true,
              startDate: '2021-04-15T00:00:00',
              endDate: '2021-04-15T00:00:00',
              requestVerification: true,
              otherData: 'OTHER DATA',
            },
            'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              job: {
                organisationName: 'Test Org 2',
                organisationLogoURL: null,
                id: 'XXXa91ff-38b9-42f2-9b50-b6655bbf0f7c',
                title: 'Test Graph2',
                description: 'Test Graph2',
                url: 'https://google.com',
                otherData: 'OTHER DATA',
              },
              approved: false,
              startDate: '2021-04-15T00:00:00',
              endDate: '2021-04-15T00:00:00',
              requestVerification: true,
              otherData: 'OTHER DATA',
            },
            'XXXbdc39-cccc-4e1e-948f-5d33a2cfb3b5': {
              job: {
                organisationName: 'Test Org 2',
                organisationLogoURL: 'https://google.com',
                id: 'XXXa91ff-38b9-42f2-9b50-b6655bbf0f7c',
                title: 'Test Graph2',
                description: 'Test Graph2',
                url: 'https://google.com',
                otherData: 'OTHER DATA',
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
        userSkills: {
          ids: ['88bbdc39-4146-4e1e-948f-5d33a2cfb3b5', 'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5'],
          entities: {
            '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              name: 'Test Graph',
              startDate: '2021-04-15T00:00:00',
              organisationLogoURL: null,
              isValidated: true,
            },
            'XXXbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              name: 'Test Graph2',
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
