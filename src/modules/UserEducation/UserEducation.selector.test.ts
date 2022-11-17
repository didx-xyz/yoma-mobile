import { INITIAL_FORM_VALUES } from '~/modules/Education/Form/EducationForm.constants'
import { rootStateFixture } from '~/redux/redux.fixture'

import { USER_EDUCATION_MOCK } from './UserEducation.fixture'
import { INITIAL_STATE } from './UserEducation.reducer'
import * as SUT from './UserEducation.selector'

describe('modules/UserEducation/UserEducation.selector', () => {
  describe('selectUserEducation', () => {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectUserEducation(state)
      // then ...
      expect(result).toEqual(INITIAL_STATE)
    })
    it('should return the entire user qualifications state', () => {
      // given ...
      const state = rootStateFixture({ userEducation: USER_EDUCATION_MOCK })
      // when ...
      const result = SUT.selectUserEducation(state)
      // then ...
      expect(result).toEqual(USER_EDUCATION_MOCK)
    })
  })
  describe('selectUserEducationCredentials', () => {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectUserEducationCredentials(state)
      // then ...
      expect(result).toEqual({ ids: [], entities: {} })
    })
    it('should return all the user qualifications credentials', () => {
      // given ...
      const state = rootStateFixture({
        userEducation: {
          ids: ['id1', 'id2'],
          entities: {
            id1: 'ENTITY 1',
            id2: 'ENTITY 2',
          },
          formValues: INITIAL_FORM_VALUES,
        },
      })
      // when ...
      const result = SUT.selectUserEducationCredentials(state)
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
    it('should return formValues object from the userEducation state', () => {
      const userEducationStateMock = {
        ids: 'IDS',
        entities: 'ENTITIES_DATA',
        formValues: 'FORM_VALUES',
      }

      const mockState = rootStateFixture({
        userEducation: userEducationStateMock,
      })
      // when ... we call the selector
      const result = SUT.selectFormValues(mockState)

      // then ... should return result as expected
      expect(result).toEqual('FORM_VALUES')
    })
  })
  describe('selectFormCertificate', () => {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectFormCertificate(state)
      // then ...
      expect(result).toBe(undefined)
    })
    it('should return the certificate in formValues should it exist', () => {
      // given ...
      const state = rootStateFixture({
        userEducation: {
          ids: ['id1', 'id2'],
          entities: {
            id1: 'ENTITY1',
            id2: 'ENTITY2',
          },
          formValues: {
            certificate: 'FILE DATA OBJECT',
          },
        },
      })
      // when ...
      const result = SUT.selectFormCertificate(state)
      // then ...
      expect(result).toBe('FILE DATA OBJECT')
    })
  })
})
