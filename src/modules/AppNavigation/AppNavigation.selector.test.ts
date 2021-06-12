import selectIsAuthenticated from './AppNavigation.selector'

describe('modules/AppNavigation/AppNavigation.selector', () => {
  describe('selectIsAuthenticated ', () => {
    it('should set isAuthenticated property value to true', () => {
      const state = {
        auth: {
          refreshToken: 'REFRESH_TOKEN',
          token: 'USER_TOKEN',
          expiresAt: 'EXPIRY_DATE',
        },
      }
      // when ... we call the selector
      const result = selectIsAuthenticated(state)
      // then ... should return result as expected
      expect(result).toEqual({ isAuthenticated: true })
    })
  })

  it('should set isAuthenticated property value to false', () => {
    const state = {
      auth: {
        refreshToken: '',
        token: '',
        expiresAt: '',
      },
    }
    // when ... we call the selector
    const result = selectIsAuthenticated(state)
    // then ... should return result as expected
    expect(result).toEqual({ isAuthenticated: false })
  })
})
