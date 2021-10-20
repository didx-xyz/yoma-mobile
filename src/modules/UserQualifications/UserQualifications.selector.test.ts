import { rootStateFixture } from '../../redux/redux.fixture'
import { INITIAL_FORM_VALUES } from '../Education/Form/EducationForm.constants'
import { USER_QUALIFICATIONS_MOCK } from './UserQualifications.fixture'
import { INITIAL_STATE } from './UserQualifications.reducer'
import * as SUT from './UserQualifications.selector'

describe('modules/CompletedChallenges/CompletedChallenges.selector', () => {
  describe('selectUserQualifications', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectUserQualifications(state)
      // then ...
      expect(result).toEqual(INITIAL_STATE)
    })
    it('should return the entire user qualifications state', () => {
      // given ...
      const state = rootStateFixture({ userQualifications: USER_QUALIFICATIONS_MOCK })
      // when ...
      const result = SUT.selectUserQualifications(state)
      // then ...
      expect(result).toEqual(USER_QUALIFICATIONS_MOCK)
    })
  })
  describe('selectUserQualificationCredentials', () => {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectUserQualificationCredentials(state)
      // then ...
      expect(result).toEqual({ ids: [], entities: {} })
    })
    it('should return all the user qualifications credentials', () => {
      // given ...
      const state = rootStateFixture({
        userQualifications: {
          ids: ['id1', 'id2'],
          entities: {
            id1: 'ENTITY 1',
            id2: 'ENTITY 2',
          },
          formValues: INITIAL_FORM_VALUES,
        },
      })
      // when ...
      const result = SUT.selectUserQualificationCredentials(state)
      // then ...
      expect(result).toEqual({
        ids: ['id1', 'id2'],
        entities: {
          id1: 'ENTITY 1',
          id2: 'ENTITY 2',
        },
      })
    })
  })
  describe('selectFormValues ', () => {
    it('should return formValues object from the userQualifications state', () => {
      const userQualificationsStateMock = {
        ids: 'IDS',
        entities: 'ENTITIES_DATA',
        formValues: 'FORM_VALUES',
      }

      const mockState = rootStateFixture({
        userQualifications: userQualificationsStateMock,
      })
      // when ... we call the selector
      const result = SUT.selectFormValues(mockState)

      // then ... should return result as expected
      expect(result).toEqual('FORM_VALUES')
    })
  })
})
