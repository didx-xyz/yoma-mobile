import { rootStateFixture } from 'redux/redux.test.fixtures'

import * as SUT from './Qualifications.selector'

describe('modules/Qualifications/Qualifications.selector', () => {
  describe('selectQualifications ', () => {
    it('should return qualifications property of the root state', () => {
      const mockPayload = {
        skillNames: ['SKILL'],
        title: 'TITLE',
        description: 'DESCRIPTION',
        organisationId: 'ORGANISATION_ID',
        url: 'URL',
        country: 'COUNTRY',
        language: 'EN',
        startTime: '2021-07-04T10:45:00Z',
        endTime: '2021-07-18T10:45:00Z',
        published: false,
      }
      const stateMock = rootStateFixture({
        qualifications: mockPayload,
      })
      // when ... we call the selector
      const result = SUT.selectQualifications(stateMock)
      // then ... should return result as expected
      expect(result).toEqual(mockPayload)
    })
    it('should return the default qualifications state', () => {
      const state = rootStateFixture()
      // when ... we call the selector
      const result = SUT.selectQualifications(state)
      // then ... should return result as expected
      expect(result).toEqual(state.qualifications)
    })
  })
})
