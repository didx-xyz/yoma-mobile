import selector from './AppNavigation.selector'

describe('modules/AppNavigation/AppNavigation.selector', () => {
  describe('selector ', () => {
    it('should set isAuthorised property value to true', () => {
      const state = {
        auth: {
          refreshToken: 'REFRESH_TOKEN',
          token: 'USER_TOKEN',
          expiresAt: 'EXPIRY_DATE',
        },
      }
      // when ... we call the selector
      const result = selector(state)
      // then ... should return result as expected
      expect(result).toEqual({ isAuthorised: true })
    })

    it('should set isAuthorised property value to false', () => {
      const state = {
        auth: {
          refreshToken: '',
          token: '',
          expiresAt: '',
        },
      }
      // when ... we call the selector
      const result = selector(state)
      // then ... should return result as expected
      expect(result).toEqual({ isAuthorised: false })
    })
    it('should set isAuthorised property value to false', () => {
      const state = {}
      // when ... we call the selector
      const result = selector(state)
      // then ... should return result as expected
      expect(result).toEqual({ isAuthorised: false })
    })
  })
})
