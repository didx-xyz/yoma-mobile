import SUT, { INITIAL_STATE, clearAuth, setAuthCredentials } from './Auth.reducer'

describe('modules/Auth/Auth.reducer', () => {
  describe('setAuthCredentials', () => {
    it('should set the Auth credentials correctly', () => {
      // given ....
      const state = INITIAL_STATE
      const credentials = {
        refreshToken: 'REFRESH_TOKEN',
        token: 'TOKEN',
        expiresAt: 'EXPIRES_AT',
        idToken: 'ID_TOKEN',
        tokenType: 'TOKEN_TYPE',
        scopes: ['SCOPES'],
        tokenAdditionalParameters: { aKey: 'TOKEN_ADDITIONAL_PARAMETERS' },
        authorizeAdditionalParameters: { aKey: 'AUTHORIZE_ADDITIONAL_PARAMETERS' },
      }
      // when ... we set the Auth credentials
      const action = setAuthCredentials(credentials)
      const result = SUT(state, action)
      // then ... should set the credentials correctly
      expect(result).toEqual(credentials)
    })
    it('should update the Auth credentials correctly', () => {
      // give ... there are are credentials in state
      const state = {
        refreshToken: 'REFRESH_TOKEN',
        token: 'TOKEN',
        expiresAt: 'EXPIRES_AT',
        idToken: 'ID_TOKEN',
        tokenType: 'TOKEN_TYPE',
        scopes: ['SCOPES'],
        tokenAdditionalParameters: { aKey: 'TOKEN_ADDITIONAL_PARAMETERS' },
        authorizeAdditionalParameters: { aKey: 'AUTHORIZE_ADDITIONAL_PARAMETERS' },
      }
      const credentials = {
        refreshToken: 'NEW REFRESH_TOKEN',
        token: 'TOKEN',
        expiresAt: 'EXPIRES_AT',
        idToken: 'ID_TOKEN',
        tokenType: 'TOKEN_TYPE',
        scopes: ['SCOPES'],
        tokenAdditionalParameters: { aKey: 'TOKEN_ADDITIONAL_PARAMETERS' },
        authorizeAdditionalParameters: { aKey: 'AUTHORIZE_ADDITIONAL_PARAMETERS' },
      }
      // when ... we update the Auth credentials
      const action = setAuthCredentials(credentials)
      const result = SUT(state, action)
      // then ... should update the credentials correctly
      expect(result).toEqual(credentials)
    })
  })
  describe('clearAuth', () => {
    it('should clear auth state', () => {
      // give ... there are no credentials in state
      const state = {
        refreshToken: 'REFRESH_TOKEN',
        token: 'TOKEN',
        expiresAt: 'EXPIRES_AT',
        idToken: 'ID_TOKEN',
        tokenType: 'TOKEN_TYPE',
        scopes: ['SCOPES'],
        tokenAdditionalParameters: { aKey: 'TOKEN_ADDITIONAL_PARAMETERS' },
        authorizeAdditionalParameters: { aKey: 'AUTHORIZE_ADDITIONAL_PARAMETERS' },
      }
      const action = clearAuth()
      const result = SUT(state, action)
      // then ... should set the default Auth state
      expect(result).toEqual(INITIAL_STATE)
    })
  })
})
