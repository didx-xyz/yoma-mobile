import SUT, {
  INITIAL_STATE,
  clearUserEducation,
  clearUserEducationFormValues,
  setUserEducation,
  setUserEducationFormValues,
  updateUserEducation,
} from './UserEducation.reducer'

describe('modules/UserEducation/UserEducation.redux', () => {
  describe('setUserEducation', () => {
    it('should correctly add the education credentials', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new education
      const qualificationsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Qualification 1',
          id2: 'Qualification 2',
          id3: 'Qualification 3',
        },
      }
      // @ts-ignore
      const action = setUserEducation(qualificationsMock)
      const result = SUT(state, action)

      // then ... state should include the new education
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

      // when ... we add new education
      const qualificationsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Qualification 1',
          id2: 'Qualification 2',
          id3: 'Qualification 3',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = setUserEducation(qualificationsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new education
      expect(result).toEqual(qualificationsMock)
    })
  })
  describe('updateUserEducation', () => {
    it('should correctly update the UserEducation state', () => {
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
      const action = updateUserEducation(QualificationsMock)
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
      const action = updateUserEducation(QualificationsMock)
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
  describe('clearUserEducation', () => {
    it('should correctly clear the education credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Qualification 1',
          id2: 'Qualification 2',
          id3: 'Qualification 3',
        },
      }

      // when ... we clear education
      const action = clearUserEducation()
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new education
      expect(result).toEqual(INITIAL_STATE)
    })
  })
  describe('setUserEducationFormValues', () => {
    it('should temporarily set form values for UserEducation create/update API', () => {
      // given ...an initial state
      const state = {
        ids: 'Normalised Ids array',
        entities: 'Normalised Entities Object',
      }

      const formValues = 'Temporary Form Object'

      // when ... we setUserEducationFormValues
      // @ts-ignore
      const action = setUserEducationFormValues(formValues)
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
      const action = setUserEducation(QualificationsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new Qualifications
      expect(result).toEqual(QualificationsMock)
    })
  })
  describe('clearUserEducationFormValues', () => {
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
      const action = clearUserEducationFormValues()
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
