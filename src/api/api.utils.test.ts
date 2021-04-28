import * as SUT from './api.utils'

describe('api/api.utils', () => {
  describe('generateEndpoint', () => {
    it.each([
      [['user', 'cred'], 'user/cred'],
      [['test', '123'], 'test/123'],
    ])('should behave same as array added with / ', (values, expected) => {
      const result = SUT.generateEndpoint(values)
      expect(result).toBe(expected)
    })
  })
})
