import { rootStateFixture } from '../../../redux/redux.test.fixtures'
import { USER_QUALIFICATION_STATE_MOCK } from '../../UserQualifications/UserQualifications.fixture'
import { INITIAL_STATE } from '../../UserQualifications/UserQualifications.reducer'
import * as SUT from './EducationWidget.selector'

describe('modules/Education/EducationWidget/EducationWidget.selector', () => {
  describe('default', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.default(state)
      // then ...
      expect(result).toEqual({ qualifications: INITIAL_STATE })
    })
    it('should return the user qualifications data in the expected format', () => {
      // given ...
      const state = rootStateFixture({
        userQualifications: USER_QUALIFICATION_STATE_MOCK,
      })
      // when ...
      const result = SUT.default(state)
      // then ...
      expect(result).toEqual({
        qualifications: {
          ids: ['88bbdc39-4146-4e1e-948f-5d33a2cfb3b5'],
          entities: {
            '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              name: 'Test Qualification',
              startDate: '2021-04-15T00:00:00',
              organisationLogoURL: null,
              isValidated: true,
            },
          },
        },
      })
    })
  })
})
