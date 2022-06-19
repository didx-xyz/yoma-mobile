import { rootStateFixture } from '~/redux/redux.fixture'

import { INITIAL_FORM_VALUES } from './Form/UserQualificationsForm.constants'
import { USER_QUALIFICATIONS_MOCK, USER_QUALIFICATIONS_STATE_MOCK } from './UserQualifications.fixture'
import { INITIAL_STATE } from './UserQualifications.reducer'
import * as SUT from './UserQualifications.selector'
import { selectUserQualifications } from './UserQualifications.selector'

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
  describe('selectUserQualificationCredentialsType', () => {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectUserQualificationCredentialsType(true)(state)
      // then ...
      expect(result).toEqual({ ids: [], entities: {} })
    })
    it('should return all the education credentials', () => {
      // given ...
      const state = rootStateFixture({
        userQualifications: {
          ids: ['id1', 'id2', 'id3'],
          entities: {
            id1: { id: 'id1', qualification: { createdByAdmin: true } },
            id2: { id: 'id2', qualification: { createdByAdmin: false } },
            id3: { id: 'id3', qualification: { createdByAdmin: true } },
          },
          formValues: INITIAL_FORM_VALUES,
        },
      })

      // when ...
      const result = SUT.selectUserQualificationCredentialsType(false)(state)

      // then ...
      expect(result).toEqual({
        ids: ['id1', 'id3'],
        entities: {
          id1: { id: 'id1', qualification: { createdByAdmin: true } },
          id3: { id: 'id3', qualification: { createdByAdmin: true } },
        },
      })
    })
    it('should return all the completed courses credentials', () => {
      // given ...
      const state = rootStateFixture({
        userQualifications: {
          ids: ['id1', 'id2', 'id3'],
          entities: {
            id1: { id: 'id1', qualification: { createdByAdmin: true } },
            id2: { id: 'id2', qualification: { createdByAdmin: false } },
            id3: { id: 'id3', qualification: { createdByAdmin: true } },
          },
          formValues: INITIAL_FORM_VALUES,
        },
      })

      // when ...
      const result = SUT.selectUserQualificationCredentialsType(true)(state)

      // then ...
      expect(result).toEqual({
        ids: ['id2'],
        entities: {
          id2: { id: 'id2', qualification: { createdByAdmin: false } },
        },
      })
    })
  })
  describe('selectUserQualificationCredentialsWidget', () => {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectUserQualificationCredentialsWidget(selectUserQualifications)(state)
      // then ...
      expect(result).toEqual({
        count: 0,
        userQualifications: {
          ids: [],
          entities: {},
        },
      })
    })
    it('should return the user qualifications data in the expected format', () => {
      // given ...
      const state = rootStateFixture({
        userQualifications: USER_QUALIFICATIONS_STATE_MOCK,
      })
      // when ...
      const result = SUT.selectUserQualificationCredentialsWidget(selectUserQualifications)(state)
      // then ...
      expect(result).toEqual({
        count: 1,
        userQualifications: {
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
  describe('selectUserQualificationCredentialsView', () => {
    it('should handle an empty state', () => {
      const stateMock = rootStateFixture()
      // when ... we call the selector
      // @ts-ignore
      const result = SUT.selectUserQualificationCredentialsView(selectUserQualifications)(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        userQualifications: {
          ids: [],
          entities: {},
        },
      })
    })
    it('should return userQualifications, skills and organisations lists', () => {
      const mockState = rootStateFixture({
        userQualifications: USER_QUALIFICATIONS_STATE_MOCK,
      })
      // when ... we call the selector
      const result = SUT.selectUserQualificationCredentialsView(selectUserQualifications)(mockState)

      // then ... should return the data required by the education view
      expect(result).toEqual({
        userQualifications: {
          ids: ['88bbdc39-4146-4e1e-948f-5d33a2cfb3b5'],
          entities: {
            '88bbdc39-4146-4e1e-948f-5d33a2cfb3b5': {
              title: 'Test Qualification',
              createdByAdmin: true,
              metadata: ['Apr 2021'],
              iconUrl: null,
              isValidated: true,
              description: 'Test Graph',
            },
          },
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
  describe('selectFormCertificate', function () {
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
        userQualifications: {
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
