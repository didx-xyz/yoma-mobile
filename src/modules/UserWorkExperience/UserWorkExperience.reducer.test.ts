import SUT, {
  INITIAL_STATE,
  clearUserWorkExperiences,
  clearUserWorkExperiencesFormValues,
  setUserWorkExperiences,
  setUserWorkExperiencesFormValues,
  updateUserWorkExperiences,
} from './UserWorkExperience.reducer'

describe('modules/UserWorkExperience/UserWorkExperience.reducer', () => {
  describe('setUserWorkExperiences', () => {
    it('should correctly add the User Work Experiences data', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we set new workExperience
      const jobsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Job 1',
          id2: 'Job 2',
          id3: 'Job 3',
        },
        formValues: {},
      }
      // @ts-ignore
      const action = setUserWorkExperiences(jobsMock)
      const result = SUT(state, action)

      // then ... state should include the new workExperience
      expect(result).toEqual(jobsMock)
    })
    it('should overwrite all current credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['idA', 'idB'],
        entities: {
          idA: 'Job A',
          idB: 'Job B',
        },
      }

      // when ... we set new workExperience
      const jobsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Job 1',
          id2: 'Job 2',
          id3: 'Job 3',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = setUserWorkExperiences(jobsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new workExperience
      expect(result).toEqual(jobsMock)
    })
  })
  describe('setUserWorkExperiencesFormValues', () => {
    it('should temporarily set form values for user Work Experiences create/update API', () => {
      // given ...an initial state
      const state = {
        ids: 'Normalised Ids array',
        entities: 'Normalised Entities Object',
      }

      const formValues = 'Temporary Form Object'

      // when ... we setUserWorkExperiencesFormValues
      // @ts-ignore
      const action = setUserWorkExperiencesFormValues(formValues)
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new workExperience
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
          idA: 'Job A',
          idB: 'Job B',
        },
      }

      // when ... we add new workExperience
      const jobsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Job 1',
          id2: 'Job 2',
          id3: 'Job 3',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = setUserWorkExperiences(jobsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new workExperience
      expect(result).toEqual(jobsMock)
    })
  })
  describe('clearUserWorkExperiencesFormValues', () => {
    it('should correctly clear the form data', () => {
      // given ...an initial state
      const state = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Job 1',
          id2: 'Job 2',
          id3: 'Job 3',
        },
        formValues: 'form data',
      }

      // when ... we clear workExperience
      const action = clearUserWorkExperiencesFormValues()
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new workExperience
      expect(result).toEqual({
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Job 1',
          id2: 'Job 2',
          id3: 'Job 3',
        },
        formValues: {},
      })
    })
  })
  describe('updateUserWorkExperiences', () => {
    it('should correctly update the userWorkExperiences state', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new workExperience
      const jobsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Job 1',
          id2: 'Job 2',
          id3: 'Job 3',
        },
        formValues: {},
      }
      // @ts-ignore
      const action = updateUserWorkExperiences(jobsMock)
      const result = SUT(state, action)

      // then ... state should include the new workExperience
      expect(result).toEqual(jobsMock)
    })
    it('should merge updated values with normalised state', () => {
      // given ...an initial state
      const state = {
        ids: ['idA', 'idB'],
        entities: {
          idA: 'Job A',
          idB: 'Job B',
        },
      }

      // when ... we add new workExperience
      const jobsMock = {
        ids: ['idC'],
        entities: {
          idC: 'Job C',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = updateUserWorkExperiences(jobsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new workExperience
      expect(result).toEqual({
        ids: ['idA', 'idB', 'idC'],
        entities: {
          idA: 'Job A',
          idB: 'Job B',
          idC: 'Job C',
        },
      })
    })
  })
  describe('clearUserWorkExperiences', () => {
    it('should correctly clear the workExperience credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Job 1',
          id2: 'Job 2',
          id3: 'Job 3',
        },
        formValues: 'form data',
      }

      // when ... we clear workExperience
      const action = clearUserWorkExperiences()
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new workExperience
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
