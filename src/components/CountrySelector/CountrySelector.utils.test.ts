import * as SUT from './CountrySelector.utils'

describe('components/CountrySelector/CountrySelector.utils', () => {
  describe('sortCountriesAsPairs', () => {
    it('should correctly filter the countries', () => {
      const countriesMock = {
        a: { name: 'Zzz' },
        b: { name: 'Aaa' },
        c: { name: 'Hhh' },
      }
      // @ts-ignore
      const result = SUT.sortCountriesAsPairs(countriesMock)
      expect(result).toEqual([
        ['b', { name: 'Aaa' }],
        ['c', { name: 'Hhh' }],
        ['a', { name: 'Zzz' }],
      ])
    })
  })
  describe('filterAgainstName', () => {
    it.each([
      [['a', { name: 'AaC' }], 'ac', true],
      [['b', { name: 'ACv' }], 'ac', true],
      [['c', { name: 'Acc' }], 'ac', true],
      [['d', { name: 'Hhh' }], 'ac', false],
    ])('should correctly filter the countries', (country, term, expected) => {
      // @ts-ignore
      const result = SUT.filterAgainstName('ac')(country)
      expect(result).toBe(expected)
    })
  })
  describe('filterCountries', () => {
    it('should correctly filter the countries', () => {
      const countriesMock = [
        ['a', { name: 'AaC' }],
        ['b', { name: 'ACv' }],
        ['c', { name: 'Acc' }],
        ['d', { name: 'Hhh' }],
        ['e', { name: 'Zzz' }],
      ]
      // @ts-ignore
      const result = SUT.filterCountries('c')(countriesMock)
      expect(result).toEqual([
        ['a', { name: 'AaC' }],
        ['b', { name: 'ACv' }],
        ['c', { name: 'Acc' }],
      ])
    })
  })
})
