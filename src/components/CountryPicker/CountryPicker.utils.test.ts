import * as SUT from './CountryPicker.utils'

describe('components/CountryPicker/CountryPicker.utils', () => {
  describe('sortCountries', () => {
    test('sortCountries', () => {
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
})
