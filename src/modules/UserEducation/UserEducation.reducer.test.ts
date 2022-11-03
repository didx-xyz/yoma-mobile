import SUT, {
  INITIAL_STATE,
  clearUserQualificationFormValues,
  clearUserQualifications,
  setUserQualificationFormValues,
  setUserQualifications,
  updateUserQualifications,
} from './UserQualifications.reducer'

describe('modules/UserQualifications/UserQualifications.redux', () => {
  describe('setUserQualifications', () => {
    it('should correctly add the qualifications credentials', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new qualifications
      const qualificationsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Qualification 1',
          id2: 'Qualification 2',
          id3: 'Qualification 3',
        },
      }
      // @ts-ignore
      const action = setUserQualifications(qualificationsMock)
      const result = SUT(state, action)

      // then ... state should include the new qualifications
      expect(result).toEqual(qualificationsMock)
    })
    it('should overwrite all current credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['idA', 'idB'],
        entities: {
          idA: 'Qualification A',
          idB: 'Qualification B',
        },
      }

      // when ... we add new qualifications
      const qualificationsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Qualification 1',
          id2: 'Qualification 2',
          id3: 'Qualification 3',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = setUserQualifications(qualificationsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new qualifications
      expect(result).toEqual(qualificationsMock)
    })
  })
  describe('updateUserQualifications', () => {
    it('should correctly update the userQualifications state', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new Qualifications
      const QualificationsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Qualification 1',
          id2: 'Qualification 2',
          id3: 'Qualification 3',
        },
        formValues: {},
      }
      // @ts-ignore
      const action = updateUserQualifications(QualificationsMock)
      const result = SUT(state, action)

      // then ... state should include the new Qualifications
      expect(result).toEqual(QualificationsMock)
    })
    it('should merge updated values with normalised state', () => {
      // given ...an initial state
      const state = {
        ids: ['idA', 'idB'],
        entities: {
          idA: 'Qualification A',
          idB: 'Qualification B',
        },
      }

      // when ... we add new Qualifications
      const QualificationsMock = {
        ids: ['idC'],
        entities: {
          idC: 'Qualification C',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = updateUserQualifications(QualificationsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new Qualifications
      expect(result).toEqual({
        ids: ['idA', 'idB', 'idC'],
        entities: {
          idA: 'Qualification A',
          idB: 'Qualification B',
          idC: 'Qualification C',
        },
      })
    })
  })
  describe('clearUserQualifications', () => {
    it('should correctly clear the qualifications credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Qualification 1',
          id2: 'Qualification 2',
          id3: 'Qualification 3',
        },
      }

      // when ... we clear qualifications
      const action = clearUserQualifications()
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new qualifications
      expect(result).toEqual(INITIAL_STATE)
    })
  })
  describe('setUserQualificationsFormValues', () => {
    it('should temporarily set form values for userQualifications create/update API', () => {
      // given ...an initial state
      const state = {
        ids: 'Normalised Ids array',
        entities: 'Normalised Entities Object',
      }

      const formValues = 'Temporary Form Object'

      // when ... we setUserQualificationsFormValues
      // @ts-ignore
      const action = setUserQualificationFormValues(formValues)
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new Qualifications
      expect(result).toEqual({
        ids: 'Normalised Ids array',
        entities: 'Normalised Entities Object',
        formValues: 'Temporary Form Object',
      })
    })
    it('should overwrite all current credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['idA', 'idB'],
        entities: {
          idA: 'Qualification A',
          idB: 'Qualification B',
        },
      }

      // when ... we add new Qualifications
      const QualificationsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Qualification 1',
          id2: 'Qualification 2',
          id3: 'Qualification 3',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = setUserQualifications(QualificationsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new Qualifications
      expect(result).toEqual(QualificationsMock)
    })
  })
  describe('clearUserQualificationsFormValues', () => {
    it('should correctly clear the form data', () => {
      // given ...an initial state
      const state = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Qualification 1',
          id2: 'Qualification 2',
          id3: 'Qualification 3',
        },
        formValues: 'form data',
      }

      // when ... we clear Qualifications
      const action = clearUserQualificationFormValues()
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new Qualifications
      expect(result).toEqual({
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Qualification 1',
          id2: 'Qualification 2',
          id3: 'Qualification 3',
        },
        formValues: {},
      })
    })
  })
})
