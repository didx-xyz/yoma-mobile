import * as SUT from './Auth.selector'

export const state = {
  auth: {
    refreshToken: 'REFRESH_TOKEN',
    token: 'USER_TOKEN',
    expiresAt: 'EXPIRY_DATE',
  },
}

describe('Auth Selectors', () => {
  describe('authSelector', () => {
    it('should check if token exists', () => {
      // when ... we call the selector
      const result = SUT.isAuthenticatedSelector(state)

      // then ... should return the slice of state as expected
      expect(result).toEqual(true)
    })
  })
})
