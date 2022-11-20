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
    it('should correctly add the qualifications credentials', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new qualifications
      const qualificationsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Education 1',
          id2: 'Education 2',
          id3: 'Education 3',
        },
      }
      // @ts-ignore
      const action = setUserEducation(qualificationsMock)
      const result = SUT(state, action)

      // then ... state should include the new qualifications
      expect(result).toEqual(qualificationsMock)
    })
    it('should overwrite all current credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['idA', 'idB'],
        entities: {
          idA: 'Education A',
          idB: 'Education B',
        },
      }

      // when ... we add new qualifications
      const qualificationsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Education 1',
          id2: 'Education 2',
          id3: 'Education 3',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = setUserEducation(qualificationsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new qualifications
      expect(result).toEqual(qualificationsMock)
    })
  })
  describe('updateUserEducation', () => {
    it('should correctly update the userEducation state', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new Education
      const EducationMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Education 1',
          id2: 'Education 2',
          id3: 'Education 3',
        },
        formValues: {},
      }
      // @ts-ignore
      const action = updateUserEducation(EducationMock)
      const result = SUT(state, action)

      // then ... state should include the new Education
      expect(result).toEqual(EducationMock)
    })
    it('should merge updated values with normalised state', () => {
      // given ...an initial state
      const state = {
        ids: ['idA', 'idB'],
        entities: {
          idA: 'Education A',
          idB: 'Education B',
        },
      }

      // when ... we add new Education
      const EducationMock = {
        ids: ['idC'],
        entities: {
          idC: 'Education C',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = updateUserEducation(EducationMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new Education
      expect(result).toEqual({
        ids: ['idA', 'idB', 'idC'],
        entities: {
          idA: 'Education A',
          idB: 'Education B',
          idC: 'Education C',
        },
      })
    })
  })
  describe('clearUserEducation', () => {
    it('should correctly clear the qualifications credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Education 1',
          id2: 'Education 2',
          id3: 'Education 3',
        },
      }

      // when ... we clear qualifications
      const action = clearUserEducation()
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new qualifications
      expect(result).toEqual(INITIAL_STATE)
    })
  })
  describe('setUserEducationFormValues', () => {
    it('should temporarily set form values for userEducation create/update API', () => {
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

      // then ... state should include the new Education
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
          idA: 'Education A',
          idB: 'Education B',
        },
      }

      // when ... we add new Education
      const EducationMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Education 1',
          id2: 'Education 2',
          id3: 'Education 3',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = setUserEducation(EducationMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new Education
      expect(result).toEqual(EducationMock)
    })
  })
  describe('clearUserEducationFormValues', () => {
    it('should correctly clear the form data', () => {
      // given ...an initial state
      const state = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Education 1',
          id2: 'Education 2',
          id3: 'Education 3',
        },
        formValues: 'form data',
      }

      // when ... we clear Education
      const action = clearUserEducationFormValues()
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new Education
      expect(result).toEqual({
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Education 1',
          id2: 'Education 2',
          id3: 'Education 3',
        },
        formValues: {},
      })
    })
  })
})
