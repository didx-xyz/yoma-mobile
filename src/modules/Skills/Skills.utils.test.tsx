import * as SUT from './Skills.utils'

describe('modules/Skills/Skills.utils', () => {
  describe('updateStateWithSearchTerm', () => {
    it('should update skills state with search term', () => {
      //given ...
      const mockState = {
        searchTerm: '',
        ids: 'Ids array',
        entities: 'Normalised entities',
      }
      //when .. updateStateWithSearchTerm
      // @ts-ignore
      const result = SUT.updateStateWithSearchTerm(mockState, 'Filter Search Term')

      //then
      expect(result).toEqual({
        searchTerm: 'Filter Search Term',
        ids: 'Ids array',
        entities: 'Normalised entities',
      })
    })
  })
})
