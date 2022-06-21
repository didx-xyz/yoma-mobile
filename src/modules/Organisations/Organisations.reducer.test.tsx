import SUT, { INITIAL_STATE, clearOrganisations, setOrganisations } from './Organisations.reducer'

describe('modules/Organisations/Organisations.reducer', () => {
  describe('setOrganisations', () => {
    it('should correctly add the organisations credentials', () => {
      // given ...an initial state
      const state = INITIAL_STATE

      // when ... we add new organisations
      const organisationsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Organisation 1',
          id2: 'Organisation 2',
          id3: 'Organisation 3',
        },
      }
      // @ts-ignore
      const action = setOrganisations(organisationsMock)
      const result = SUT(state, action)

      // then ... state should include the new organisations
      expect(result).toEqual(organisationsMock)
    })
    it('should overwrite all current credentials', () => {
      // given ...an initial state
      const state = {
        ids: ['idA', 'idB'],
        entities: {
          idA: 'Organisation A',
          idB: 'Organisation B',
        },
      }

      // when ... we add new organisations
      const organisationsMock = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Organisation 1',
          id2: 'Organisation 2',
          id3: 'Organisation 3',
        },
      }
      // @ts-ignore - the shape of the data doesn't matter
      const action = setOrganisations(organisationsMock)
      // @ts-ignore - the shape of the data doesn't matter
      const result = SUT(state, action)

      // then ... state should include the new organisations
      expect(result).toEqual(organisationsMock)
    })
  })
  describe('clearOrganisations', () => {
    it('should clear organisations state', () => {
      // give ... organisations in state
      const state = {
        ids: ['id1', 'id2', 'id3'],
        entities: {
          id1: 'Organisation 1',
          id2: 'Organisation 2',
          id3: 'Organisation 3',
        },
      }
      //when we clearOrganisations
      const action = clearOrganisations()
      // @ts-ignore full type is not required for testing
      const result = SUT(state, action)

      // then ... should set the default Organisations state
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
