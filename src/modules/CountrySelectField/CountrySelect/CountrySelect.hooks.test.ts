import { act, renderHook } from '@testing-library/react-hooks'

import * as SUT from './CountrySelect.hooks'

describe('src/modules/CountrySelectField/CountrySelect/CountrySelect.hooks', () => {
  describe('useCountriesFilter', () => {
    it('should handle an initial load', () => {
      const countriesIDsMock = ['South Africa', 'Great Britain', 'United States of America']
      const { result } = renderHook(() => SUT.useCountriesFilter(countriesIDsMock))

      expect(result.current.results).toEqual(countriesIDsMock)
      expect(result.current.hasNoResults).toEqual(false)
    })
    it('should return all countries if search results is not long enough', () => {
      const countriesIDsMock = ['South Africa', 'Great Britain', 'United States of America']
      const { result } = renderHook(() => SUT.useCountriesFilter(countriesIDsMock))

      act(() => result.current.setSearchTerm('sa'))

      expect(result.current.results).toEqual(countriesIDsMock)
      expect(result.current.hasNoResults).toEqual(false)
    })
    it('should return no results if search term does not match', () => {
      const countriesIDsMock = ['South Africa', 'Great Britain', 'United States of America']
      const { result } = renderHook(() => SUT.useCountriesFilter(countriesIDsMock))

      act(() => result.current.setSearchTerm('xxx'))

      expect(result.current.results).toEqual([])
      expect(result.current.hasNoResults).toEqual(true)
    })
    it('should correctly filter the countries', () => {
      const countriesIDsMock = ['South Africa', 'Great Britain', 'United States of America']
      const { result } = renderHook(() => SUT.useCountriesFilter(countriesIDsMock))

      act(() => result.current.setSearchTerm('ica'))

      expect(result.current.results).toEqual(['South Africa', 'United States of America'])
      expect(result.current.hasNoResults).toEqual(false)
    })
  })
})
