import SUT, { clearUserJobs, INITIAL_STATE, setUserJobs } from './UserJobs.reducer'

describe('src/modules/User/Jobs/Jobs.redux', () => {
  describe('setUserJobs', () => {
    it('should correctly add the jobs credentials', () => {
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
