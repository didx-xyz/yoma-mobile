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
  describe('sanitiseDateRange', () => {
    it('should return json string values from given Date objects', () => {
      const result = SUT.sanitiseDateRange({
        startTime: new Date('2021-06-02T10:32:47.330Z'),
        endTime: new Date('2021-08-02T10:32:47.330Z'),
      })

      expect(result).toEqual({ startTime: '2021-06-02T10:32:47.330Z', endTime: '2021-08-02T10:32:47.330Z' })
    })
  })
})
