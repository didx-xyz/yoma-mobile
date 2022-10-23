import { rootStateFixture } from '~/redux/redux.fixture'

import { INITIAL_FORM_VALUES } from './Form/UserEducationForm.constants'
import { USER_QUALIFICATIONS_MOCK, USER_QUALIFICATIONS_STATE_MOCK } from './UserEducation.fixture'
import { INITIAL_STATE } from './UserEducation.reducer'
import * as SUT from './UserEducation.selector'
import { selectUserEducation } from './UserEducation.selector'

describe('modules/CompletedChallenges/CompletedChallenges.selector', () => {
  describe('selectUserEducation', function () {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectUserEducation(state)
      // then ...
      expect(result).toEqual(INITIAL_STATE)
    })
    it('should return the entire user education state', () => {
      // given ...
      const state = rootStateFixture({ UserEducation: USER_QUALIFICATIONS_MOCK })
      // when ...
      const result = SUT.selectUserEducation(state)
      // then ...
      expect(result).toEqual(USER_QUALIFICATIONS_MOCK)
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
    it('should return all the user education credentials', () => {
      // given ...
      const state = rootStateFixture({
        UserEducation: {
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
  describe('selectUserEducationCredentialsType', () => {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectUserEducationCredentialsType(true)(state)
      // then ...
      expect(result).toEqual({ ids: [], entities: {} })
    })
    it('should return all the education credentials', () => {
      // given ...
      const state = rootStateFixture({
        UserEducation: {
          ids: ['id1', 'id2', 'id3'],
          entities: {
            id1: { id: 'id1', opportunity: { createdByAdmin: true } },
            id2: { id: 'id2', opportunity: { createdByAdmin: false } },
            id3: { id: 'id3', opportunity: { createdByAdmin: true } },
          },
          formValues: INITIAL_FORM_VALUES,
        },
      })

      // when ...
      const result = SUT.selectUserEducationCredentialsType(false)(state)

      // then ...
      expect(result).toEqual({
        ids: ['id1', 'id3'],
        entities: {
          id1: { id: 'id1', opportunity: { createdByAdmin: true } },
          id3: { id: 'id3', opportunity: { createdByAdmin: true } },
        },
      })
    })
    it('should return all the completed courses credentials', () => {
      // given ...
      const state = rootStateFixture({
        UserEducation: {
          ids: ['id1', 'id2', 'id3'],
          entities: {
            id1: { id: 'id1', opportunity: { createdByAdmin: true } },
            id2: { id: 'id2', opportunity: { createdByAdmin: false } },
            id3: { id: 'id3', opportunity: { createdByAdmin: true } },
          },
          formValues: INITIAL_FORM_VALUES,
        },
      })

      // when ...
      const result = SUT.selectUserEducationCredentialsType(true)(state)

      // then ...
      expect(result).toEqual({
        ids: ['id2'],
        entities: {
          id2: { id: 'id2', opportunity: { createdByAdmin: false } },
        },
      })
    })
  })
  describe('selectUserEducationCredentialsWidget', () => {
    it('should correctly handle an empty state', () => {
      // given ...
      const state = rootStateFixture()
      // when ...
      const result = SUT.selectUserEducationCredentialsWidget(selectUserEducation)(state)
      // then ...
      expect(result).toEqual({
        count: 0,
        UserEducation: {
          ids: [],
          entities: {},
        },
      })
    })
    it('should return the user education data in the expected format', () => {
      // given ...
      const state = rootStateFixture({
        UserEducation: USER_QUALIFICATIONS_STATE_MOCK,
      })
      // when ...
      const result = SUT.selectUserEducationCredentialsWidget(selectUserEducation)(state)
      // then ...
      expect(result).toEqual({
        count: 2,
        UserEducation: {
          ids: ['USER_QUALIFICATIONS_STATE_MOCK-001', 'USER_QUALIFICATIONS_STATE_MOCK-002'],
          entities: {
            'USER_QUALIFICATIONS_STATE_MOCK-001': {
              name: 'Test Qualification',
              startDate: '2021-04-15T00:00:00',
              organisationLogoURL: null,
              isValidated: true,
            },
            'USER_QUALIFICATIONS_STATE_MOCK-002': {
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
  describe('selectUserEducationCredentialsView', () => {
    it('should handle an empty state', () => {
      const stateMock = rootStateFixture()
      // when ... we call the selector
      // @ts-ignore
      const result = SUT.selectUserEducationCredentialsView(selectUserEducation)(stateMock)

      // then ... should return result as expected
      expect(result).toEqual({
        UserEducation: {
          ids: [],
          entities: {},
        },
      })
    })
    it('should return UserEducation, skills and organisations lists', () => {
      const mockState = rootStateFixture({
        UserEducation: USER_QUALIFICATIONS_STATE_MOCK,
      })
      // when ... we call the selector
      const result = SUT.selectUserEducationCredentialsView(selectUserEducation)(mockState)

      // then ... should return the data required by the education view
      expect(result).toEqual({
        UserEducation: {
          ids: ['USER_QUALIFICATIONS_STATE_MOCK-001', 'USER_QUALIFICATIONS_STATE_MOCK-002'],
          entities: {
            'USER_QUALIFICATIONS_STATE_MOCK-001': {
              createdByAdmin: true,
              description: 'Test Graph',
              iconUrl: null,
              title: 'Test Qualification',
              isValidated: true,
              metadata: ['Apr 2021'],
            },
            'USER_QUALIFICATIONS_STATE_MOCK-002': {
              createdByAdmin: false,
              description: 'Test Graph',
              iconUrl: null,
              title: 'Test Qualification',
              isValidated: true,
              metadata: ['Apr 2021'],
            },
          },
        },
      })
    })
  })
  describe('selectFormValues ', () => {
    it('should return formValues object from the UserEducation state', () => {
      const UserEducationStateMock = {
        ids: 'IDS',
        entities: 'ENTITIES_DATA',
        formValues: 'FORM_VALUES',
      }

      const mockState = rootStateFixture({
        UserEducation: UserEducationStateMock,
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
        UserEducation: {
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
