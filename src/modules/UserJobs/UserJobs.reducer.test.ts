import SUT, { clearUserJobs, INITIAL_STATE, setUserJobs, updateNormalisedUserJobs } from './UserJobs.reducer'

describe('src/modules/User/Jobs/Jobs.reducer', () => {
  describe('setUserJobs', () => {
    it('should correctly add the userJobs data', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new jobs
      const jobsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Job 1',
          id2: 'Job 2',
          id3: 'Job 3',
        },
        formValues: null,
      }
      // @ts-ignore
      const action = setUserJobs(jobsMock)
      const result = SUT(state, action)

      // then ... state should include the new jobs
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

      // when ... we add new jobs
      const jobsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Job 1',
          id2: 'Job 2',
          id3: 'Job 3',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = setUserJobs(jobsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new jobs
      expect(result).toEqual(jobsMock)
    })
  })
  describe('updateNormalisedUserJobs', () => {
    it('should correctly update the userJobs state', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new jobs
      const jobsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Job 1',
          id2: 'Job 2',
          id3: 'Job 3',
        },
        formValues: null,
      }
      // @ts-ignore
      const action = updateNormalisedUserJobs(jobsMock)
      const result = SUT(state, action)

      // then ... state should include the new jobs
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

      // when ... we add new jobs
      const jobsMock = {
        ids: ['idC'],
        entities: {
          idC: 'Job C',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = updateNormalisedUserJobs(jobsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new jobs
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
  describe('clearUserJobs', () => {
    it('should correctly clear the jobs credentials', () => {
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

      // when ... we clear jobs
      const action = clearUserJobs()
      // @ts-ignore
      const result = SUT(state, action)

      // then ... state should include the new jobs
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
