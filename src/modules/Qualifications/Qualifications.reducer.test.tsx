import { rootStateFixture } from 'redux/redux.test.fixtures'

import SUT, { clearQualifications, INITIAL_STATE, setQualifications } from './Qualifications.reducer'

describe('modules/Qualifications/Qualifications.reducer', () => {
  describe('setQualifications', () => {
    it('should set qualifications correctly', () => {
      // given ....
      const mockState = rootStateFixture({})
      const mockData = {
        title: 'test email',
        description: 'test',
        url: 'none',
        language: 'en',
        organisationId: '',
        skillNames: ['Web Design'],
        country: 'Algeria',
        startTime: '2021-07-04T10:45:00.000Z',
        endTime: '2021-07-18T10:45:00.000Z',
        published: false,
      }
      // when ... we set the Qualifications credentials
      const action = setQualifications(mockData)
      const result = SUT(mockState, action)
      // then ... should set the qualifications correctly
      expect(result).toEqual(mockData)
    })
  })
  describe('clearQualifications', () => {
    it('should clear qualifications state', () => {
      // give ... qualifications in state
      const mockState = rootStateFixture({
        qualifications: [
          {
            key: 'SOME_KEY',
            value: 'SOME_VALUE',
          },
        ],
      })
      //when we clearQualifications
      const action = clearQualifications()
      const result = SUT(mockState, action)
      // then ... should set the default Qualifications state
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
