import * as SUT from './form.utils'

describe('form.utils', () => {
  describe('getHasValuesChanged', () => {
    it.each([
      [{ name: '' }, { name: '' }, false, false],
      [{ name: 'name' }, { name: 'changedName' }, true, true],
      [{ name: '' }, { name: 'name' }, true, true],
      [{ name: 'name' }, { name: 'InvalidName' }, false, false],
    ])('should return a boolean value after comparing the object', (initialValues, finalValues, isValid, expected) => {
      const result = SUT.getHasValuesChanged(initialValues, finalValues, isValid)
      expect(result).toEqual(expected)
    })
  })
})
